const { itemService } = require('../services');
const { asyncWrap } = require('../utils/error');

const getAll = asyncWrap(async (req, res) => {
    const { sort, order } = req.query
    let { limit, offset } = req.query

    limit = limit || 50
    offset = offset || 0

    if (limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getAll(sort, order, +limit, +offset);

    return res.status(200).json({ data });
})

const getMainList = asyncWrap(async (req, res) => {
    const { main_category_id, sort, order, limit, offset } = req.query;

    if (limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getMainList(main_category_id, sort, order, +limit, +offset);

    return res.status(200).json({ data });
})

const getSubList = asyncWrap(async (req, res) => {
    const { sub_category_id, sort, order, limit, offset } = req.query

    if (limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getSubList(sub_category_id, sort, order, +limit, +offset);

    return res.status(200).json({ data });
})

const getNewList = asyncWrap(async (req, res) => {
    const data = await itemService.getNewList();

    return res.status(200).json({ data });
})

const getItemById = asyncWrap(async (req, res) => {
    const itemId = req.params.id;
    const { sort, order } = req.query;

    if (!itemId) {
        return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const item = await itemService.getItemById(itemId);
    return res.status(200).json({ data: item });
});

const deleteItem = asyncWrap(async (req, res) => {
    const itemName = req.params.itemName;

    const result = await itemService.deleteItem(itemName);
    return res.status(201).json({ message: "Item deleted success" });
})

const updateItem = asyncWrap(async (req, res) => {
    const updateItem = req.params.updateName;
    const { updateItemName, updateItemDescription, updateItemPrice, updateItemDetail, updateItemMaxAmount, updateItemStock } = req.query;

    const result = await itemService.updateItem(updateItem, updateItemName, updateItemDescription, updateItemPrice, updateItemDetail, updateItemMaxAmount, updateItemStock);
    return res.status(201).json({ message: "Item update success" });
})

module.exports = {
    getItemById,
    getSubList,
    getNewList,
    getMainList,
    getAll,
    deleteItem,
    updateItem
}