const db = require('../models');

const getLikes = async (userId) => {
    try {
        const result = await db.Items.findAll({
            include: [
                {
                    model: db.Users,
                    as: 'likedItems',
                    through: { attributes: [] },
                    where: { id: userId }
                }
            ],
        })
        return result;
    } catch (error) {
        console.error('error: ', error);
    }
}

const addLikes = async (itemId, userId) => {
    try {
        const result = await db.Likes.create({
            item_id: itemId,
            user_id: userId
        })

        return result;
    } catch (error) {
        console.error('error: ', error);
    }
}

const deleteLikes = async (itemId, userId) => {
    const result = await db.Likes.destroy({
        where: {
            item_id: itemId,
            user_id: userId
        }
    });

    if (result != 0 && result != 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_DELETED');

    return result;
}

module.exports = {
    getLikes,
    addLikes,
    deleteLikes
}