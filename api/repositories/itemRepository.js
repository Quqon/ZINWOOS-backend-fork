const db = require('../models');

const getAll = async (sort, order, limit, offset) => {
    try {
        const query = `
            SELECT items.*, COUNT(likes.item_id) as likeCount
            FROM items
            LEFT JOIN likes ON likes.item_id = items.id
            LEFT JOIN sub_categories ON sub_categories.id = items.id
            LEFT JOIN main_categories ON main_categories.id = sub_categories.main_category_id
            GROUP BY items.id, items.name, items.price, items.description, items.sub_category_id
            ORDER BY ${sort === 'likeCount' ? 'likeCount' : `items.${sort}`} ${order}
            LIMIT :limit OFFSET :offset
        `;

        const result = await db.sequelize.query(query, {
            replacements: { limit, offset },
            type: db.Sequelize.QueryTypes.SELECT
        });

        return result;
    } catch (error) {
        console.error('error:', error);
    }
};


const getMainList = async (main_category_id, sort = 'Items.id', order = 'ASC', limit, offset) => {
    const query = `
            SELECT items.*, COUNT(likes.item_id) as likeCount
            FROM items
            LEFT JOIN likes ON likes.item_id = items.id
            LEFT JOIN sub_categories ON sub_categories.id = items.sub_category_id
            WHERE sub_categories.main_category_id = :main_category_id
            GROUP BY items.id
            ORDER BY ${sort === 'likeCount' ? 'likeCount' : `items.${sort}`} ${order}
            LIMIT :limit OFFSET :offset
        `;

    const result = await db.sequelize.query(query, {
        replacements: { main_category_id, limit, offset },
        type: db.Sequelize.QueryTypes.SELECT
    });
    return result;
}

const getSubList = async (sub_category_id, sort, order, limit, offset) => {
    try {
        const query = `
            SELECT items.*, COUNT(likes.item_id) as likeCount
            FROM items
            LEFT JOIN likes ON likes.item_id = items.id
            WHERE items.sub_category_id = :sub_category_id
            GROUP BY items.id
            ORDER BY ${sort === 'likeCount' ? 'likeCount' : `items.${sort}`} ${order}
            LIMIT :limit OFFSET :offset
        `;

        const result = await db.sequelize.query(query, {
            replacements: { sub_category_id, limit, offset },
            type: db.Sequelize.QueryTypes.SELECT
        });

        return result;
    } catch (error) {
        console.error('error:', error);
    }
};

const getNewList = async () => {
    try {
        const result = await db.Items.findAll({
            include: [
                {
                    model: db.Tags,
                    as: 'Tags',
                    through:
                    {
                        model: db.Tags_items,
                        attributes: []
                    },
                    where: {
                        '$Tags.tags_items.tag_id$': 1
                    }
                }
            ],
            attributes: [
                'id',
                'name',
                'description',
                'detail_image'
            ],
            distinct: true,
            logging: console.log
        })
        return result;
    } catch (error) {
        console.error('error', error)
    }
}

const readItem = async (itemId) => {
    try {
        const itemInfo = await db.Items.findAll({
            include: [
                {
                    model: db.Options,
                    as: 'options',
                    through: { attributes: [] }
                },
            ],
            where: { id: itemId }
        });

        return itemInfo;
    } catch (error) {
        console.error(error);
    }
}

const deleteItem = async (itemName) => {
    try {
        const result = await db.Items.destroy({
            where: { name: itemName }
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

const updateItem = async (updateItemName, name, description, price, detail, max_amount, stock) => {
    try {
        const [affectedRows] = await db.Items.update(
            {
                name,
                description,
                price,
                detail,
                max_amount,
                stock
            },
            {
                where: { name: updateItemName }
            }
        )
        return affectedRows;
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

module.exports = {
    getAll,
    getMainList,
    getSubList,
    getNewList,
    readItem,
    deleteItem,
    updateItem
};