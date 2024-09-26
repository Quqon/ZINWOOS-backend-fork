const fileRepository = require('../repositories/fileRepository');

const matchId = {
    CLOTHING: 1,
    ACCESSORIES: 1,
    DIGITALS: 2,
    BOOKS: 3,
    STICKERS: 4,
    PHOTOCARD: 5,
    SHIRTS: 6,
    TIME: 7
}

let sub_category_id = 0;

const uploadItemImage = async (req, res) => {
    const file = req.file;
    const sub_category_name = req.body.inputId;
    const item_image_name = req.body.inputName;
    const filePath = `/uploads/${file.filename}`

    for (i in matchId) {
        if (i === sub_category_name) {
            sub_category_id = matchId[i];
        }
    }

    await fileRepository.uploadItemImage(filePath, item_image_name, sub_category_id);

    res.status(201).json({ message: "ItemImage uploaded success" });
}

const uploadItem = async (req, res) => {
    const file = req.file;
    const item_name = req.body.inputItemName;
    const item_description = req.body.inputItemDescription;
    const item_price = req.body.inputItemPrice;
    const item_detail = req.body.inputItemDetail;
    const item_sub_category_id = req.body.inputItemSubCategoryId;
    const item_max_amount = req.body.inputItemMaxAmount;
    const item_stock = req.body.inputItemStock;
    const item_detail_image = `/uploads/${file.filename}`

    for (i in matchId) {
        if (i === item_sub_category_id) {
            sub_category_id = matchId[i];
        }
    }

    await fileRepository.uploadItem(
        item_name,
        item_description,
        item_price,
        item_detail,
        item_detail_image,
        sub_category_id,
        item_max_amount,
        item_stock
    );

    res.status(201).json({ message: "Item uploaded success" })
}

module.exports = {
    uploadItemImage,
    uploadItem
}