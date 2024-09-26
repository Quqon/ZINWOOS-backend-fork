const db = require('../models');

const uploadItemImage = async (filePath, item_image_name, sub_category_id) => {
    try {
        const result = await db.Item_images.create({
            image_URL: filePath,
            name: item_image_name,
            item_id: sub_category_id
        });
    } catch (error) {
        console.error(error);
    }
}

const uploadItem = async (item_name, item_description, item_price, item_detail, item_detail_image, sub_category_id, item_max_amount, item_stock) => {
    try {
        const result = await db.Items.create({
            name: item_name,
            description: item_description,
            price: item_price,
            detail: item_detail,
            detail_image: item_detail_image,
            sub_category_id,
            max_amount: item_max_amount,
            stock: item_stock
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    uploadItemImage,
    uploadItem
};