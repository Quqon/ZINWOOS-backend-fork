const Orders = require('../models/orders');
const Items = require('../models/items');
const Carts = require('../models/carts');
const db = require('../models');

const addOrderList = async (userId, tmp, cartId, itemId, quantity) => {
    const transaction = await sequelize.transaction();

    try {
        for (let i = 0; i < db.Orders.length; i++) {
            const order = db.Orders[i];
            await db.Orders.create({
                user_id: userId,
                item_id: order.item_id,
                quantity: order.quantity
            }, { transaction });

            await db.Items.decrement('stock', {
                by: order.quantity,
                where: { id: order.item_id },
                transaction
            });

            await db.Carts.destroy({
                where: {
                    user_id: userId,
                    id: { [Sequelize.Op.in]: cartId }
                },
                transaction
            });

            await transaction.commit();
        }
    } catch (err) {
        await transaction.rollback();
        const error = new Error(`ROLLBACK: ${err.message}`);
        error.statusCode = 400;
        throw error;
    }
}

const getOrderList = async (userId) => {
    const result = await db.Orders.findAll({
        where: { user_id: userId },
        attributes: ['id', 'quantity', 'created_at'],
        include: [
            {
                model: users,
                where: { id: db.Orders.user_id },
                attributes: ['name', 'address']
            },
            {
                model: Items,
                where: { id: db / Orders.item_id },
                attributes: ['detail_image', 'name', 'price']
            }
        ]
    })
    return result;
}

module.exports = {
    addOrderList,
    getOrderList
}