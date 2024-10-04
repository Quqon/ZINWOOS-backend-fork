const itemRepository = require('../repositories/itemRepository');

const getAll = async (sort, order, limit, offset) => {
    return await itemRepository.getAll(sort, order, limit, offset);
}

const getMainList = async (main_category_id, sort, order, limit, offset) => {
    const result = await itemRepository.getMainList(main_category_id, sort, order, limit, offset);
    return result;
}

const getSubList = async (sub_category_id, sort, order, limit, offset) => {
    const result = await itemRepository.getSubList(sub_category_id, sort, order, limit, offset);
    return result;
}

const getNewList = async () => {
    const data = await itemRepository.getNewList();
    return data;
}

const getItemById = async (itemId) => {
    const item = await itemRepository.readItem(itemId);
    return item;
}

const deleteItem = async (itemName) => {
    const result = await itemRepository.deleteItem(itemName);
    return result;
}

const updateItem = async (updateItemName, name, description, price, detail, max_amount, stock, File) => {
    const result = await itemRepository.updateItem(updateItemName, name, description, price, detail, max_amount, stock, File);
    return result;
}

module.exports = {
    getItemById,
    getNewList,
    getSubList,
    getMainList,
    getAll,
    deleteItem,
    updateItem
}