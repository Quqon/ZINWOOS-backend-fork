const itemService = require('../../services/itemService');
const itemController = require('../itemController');
const { expect } = require('@jest/globals');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');

describe('itemController test', () => {
    let req, res, next;

    const mockItems = [
        {
            id: 3,
            name: 'Item 3',
            price: 300
        }
    ]

    beforeEach(() => {
        req = mockReq();
        res = mockRes();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
        next = jest.fn();

    })

    afterEach(() => {
        sinon.restore();
    })

    describe('test getAll method', () => {
        it('should handle custom limit and offset from query', async () => {
            req.query = { limit: 10, offset: 5, sort: 'price', order: 'desc' };

            const getAllStub = sinon.stub(itemService, 'getAll').resolves(mockItems);

            await itemController.getAll(req, res);

            sinon.assert.calledWith(getAllStub, 'price', 'desc', 10, 5)
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockItems });
        })

        it('should return an error if limit exceeds 100', async () => {
            req.query = { limit: 101, offset: 10, sort: 'price', order: 'ASC' };

            await itemController.getAll(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Too Many Datas'
            }))
        });

    })

    describe('test getMainList method', () => {
        it('Should be called including the main_category_id of the query', async () => {
            req.query = { main_category_id: 1, sort: 'price', order: 'DESC', limit: 10, offset: 5 };

            const getMainListStub = sinon.stub(itemService, 'getMainList').resolves(mockItems);

            await itemController.getMainList(req, res);

            sinon.assert.calledWith(getMainListStub, 1, 'price', 'DESC', 10, 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockItems });
        })

        it('should return an error if limit exceeds 100', async () => {
            req.query = { limit: 101 };

            await itemController.getMainList(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: "Too Many Datas"
            }))
        })
    })

    describe('test getSubList method', () => {
        it('Should be called including the sub_category_id of the query', async () => {
            req.query = { sub_category_id: 1, sort: 'price', order: 'DESC', limit: 10, offset: 5 };

            const getSubListStub = sinon.stub(itemService, 'getSubList').resolves(mockItems);

            await itemController.getSubList(req, res);

            sinon.assert.calledWith(getSubListStub, 1, 'price', 'DESC', 10, 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockItems });
        })

        it('should return an error if limit exceeds 100', async () => {
            req.query = { limit: 101 };

            await itemController.getSubList(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: "Too Many Datas"
            }));
        })
    })

    describe('test getNewList method', () => {
        it('should return 200 and the new list of items', async () => {

            const getNewListStub = sinon.stub(itemService, 'getNewList').resolves(mockItems);

            await itemController.getNewList(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockItems });
        })
    })

    describe('test getItemById method', () => {
        it('should return 200 and the item if id is provided', async () => {
            req.params = { id: 1 };
            req.query = { sort: 'name', order: 'ASC' };

            const getItemByIdStub = sinon.stub(itemService, 'getItemById').resolves(mockItems);

            await itemController.getItemById(req, res);

            sinon.assert.calledWith(getItemByIdStub, 1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockItems });
        })

        it('should retrun 400 if id is not provided', async () => {
            req.params = {};

            await itemController.getItemById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'KEY_ERROR' });
        })
    })

    describe('test deleteItem method', () => {
        it('should return 200 and the item if itemName is provided', async () => {
            req.params = { itemName: 'book' };

            const deleteItemStub = sinon.stub(itemService, 'deleteItem').resolves(mockItems);

            await itemController.deleteItem(req, res);

            sinon.assert.calledWith(deleteItemStub, 'book');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Item deleted success" });
        })
    })

    describe('test updateItem method', () => {
        it('', async () => {
            req.params = { updateName: 'book' };
            req.query = { updateItemName: 'book', updateItemDescription: 'book', updateItemPrice: 500, updateItemDetail: 'book', updateItemMaxAmount: 10, updateItemStock: 10 };

            const updateItemStub = sinon.stub(itemService, 'updateItem').resolves(mockItems);

            await itemController.updateItem(req, res);

            sinon.assert.calledWith(updateItemStub, 'book', 'book', 'book', 500, 'book', 10, 10);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Item update success" });
        })
    })

})