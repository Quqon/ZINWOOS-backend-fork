const db = require('../models');
const Sequelize = require('sequelize');

const createCartList = async (userId, itemId, quantity, optionId) => {
    const result = await db.Carts.create({
        user_id: userId,
        item_id: itemId,
        quantity: quantity,
        option_id: optionId
    })
    return result;
}

const getAllCart = async (userId, limit, offset) => {
    try {
        const result = await db.Carts.findAll({
            include: [
                {
                    model: db.Items,
                },
                {
                    model: db.Options,
                }
            ],
            limit: limit,
            offset: offset,
            where: { user_id: userId },
        })
        return result;
    } catch (error) {
        console.error('error: ', error);
    }
}

const getNonCartOption = async (optionId) => {
    try {
        const result = await db.Options.findAll({
            where: { id: optionId }
        })

        return result;
    } catch (error) {
        console.error('error', error);
    }
}

const checkCart = async (userId, itemId, optionId) => {
    try {
        const result = await db.Carts.findOne({
            where: {
                user_id: userId,
                item_id: itemId,
                option_id: optionId
            }
        })
        const exists = result !== null;
        return exists;
    } catch (error) {
        console.error('error :', error);
    }
}

const checkCartById = async (userId, cartId) => {
    try {
        const result = await db.Carts.findOne({
            where: {
                user_id: userId,
                id: cartId
            },
        })
        const exists = result !== null;
        return exists;
    } catch (error) {
        console.error('error: ', error);
    }
}

const updateCart = async (userId, itemId, quantity, optionId) => {
    try {
        const result = await db.Carts.update({
            quantity: Sequelize.literal(`quantity + ${quantity}`)
        },
            {
                where: {
                    user_id: userId,
                    item_id: itemId,
                    option_id: optionId
                }
            })
        return result;
    } catch (error) {
        console.error('error:', error)
    }
}

const plusQuantity = async (cartId) => {
    const result = await db.Carts.update({
        quantity: Sequelize.literal('quantity + 1'),
    },
        {
            where: { id: cartId }
        })
    return result;
}

const minusQuantity = async (cartId) => {
    await db.Carts.update({
        quantity: Sequelize.literal('quantity - 1')
    },
        {
            where: { id: cartId }
        })

    const cart = await db.Carts.findOne({
        where: { id: cartId },
        attributes: ['quantity']
    }
    )
    if (cart && cart.quantity <= 0) {
        await db.Carts.update({
            quantity: 1
        }, {
            where: { id: cartId }
        })
    }
    return cart;
}

const deleteCart = async (userId, cartId) => {
    try {
        const result = await db.Carts.destroy({
            where: {
                user_id: userId,
                id: cartId
            }
        })
        return result;
    } catch (error) {
        console.error('error: ', error)
    }

}

module.exports = {
    createCartList,
    getAllCart,
    checkCart,
    checkCartById,
    updateCart,
    plusQuantity,
    minusQuantity,
    deleteCart,
    getNonCartOption
}