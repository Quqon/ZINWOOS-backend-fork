const sinon = require('sinon');
const { expect } = require('@jest/globals');
const db = require('../../models');
const itemRepository = require('../itemRepository');

describe('itemRepository test', () => {
    const mockItems = [
        { id: 1, name: 'Item 1', likeCount: 5, price: 500 },
        { id: 2, name: 'Item 2', likeCount: 3, price: 300 }
    ]

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(db.sequelize, 'query');
        sandbox.stub(db.Items, 'findAll');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('test getAll method', () => {
        it('should return items sorted by likeCount', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getAll('likeCount', 'DESC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY likeCount DESC');
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by price', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getAll('price', 'DESC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY items.price DESC');
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by name', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getAll('name', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY items.name ASC');
            expect(result).toEqual(mockItems);
        })

        it('should limit and offset the results', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getAll('name', 'ASC', 2, 1);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('LIMIT :limit OFFSET :offset');
            expect(db.sequelize.query.firstCall.args[1].replacements.limit).toBe(2);
            expect(db.sequelize.query.firstCall.args[1].replacements.offset).toBe(1);
            expect(result).toEqual(mockItems);
        })
    })

    describe('test getMainList method', () => {
        it('only items that match the main_category_id must be imported', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getMainList(1, 'name', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('WHERE sub_categories.main_category_id = :main_category_id');
            expect(db.sequelize.query.firstCall.args[1].replacements.main_category_id).toBe(1);
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by likeCount', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getMainList(1, 'likeCount', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY likeCount ASC');
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by price', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getMainList(1, 'price', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY items.price ASC');
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by name', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getMainList(1, 'name', 'DESC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY items.name DESC');
            expect(result).toEqual(mockItems);
        });

        it('should limit and offset the results', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getMainList(1, 'name', 'ASC', 2, 2);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[1].replacements.limit).toBe(2);
            expect(db.sequelize.query.firstCall.args[1].replacements.offset).toBe(2);
            expect(result).toEqual(mockItems);
        });
    })

    describe('test getSubList method', () => {
        it('only items that match the sub_category_id must be imported ', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getSubList(2, 'name', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('WHERE items.sub_category_id = :sub_category_id');
            expect(db.sequelize.query.firstCall.args[1].replacements.sub_category_id).toBe(2);
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by likeCount', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getSubList(2, 'likeCount', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY likeCount ASC');
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by price', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getSubList(2, 'price', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY items.price ASC');
            expect(result).toEqual(mockItems);
        });

        it('should return items sorted by name', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getSubList(2, 'name', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[0]).toContain('ORDER BY items.name ASC');
            expect(result).toEqual(mockItems);
        });

        it('should limit and offset the results', async () => {
            db.sequelize.query.resolves(mockItems);

            const result = await itemRepository.getSubList(2, 'name', 'ASC', 10, 0);

            expect(db.sequelize.query.calledOnce).toBe(true);
            expect(db.sequelize.query.firstCall.args[1].replacements.limit).toBe(10);
            expect(db.sequelize.query.firstCall.args[1].replacements.offset).toBe(0);
            expect(result).toEqual(mockItems);
        });
    })

    describe('test getNewList method', () => {
        it('should return items with the specified tag_id', async () => {
            db.Items.findAll.resolves(mockItems);

            const result = await itemRepository.getNewList();

            expect(db.Items.findAll.calledOnce).toBe(true);
            expect(db.Items.findAll.firstCall.args[0].include[0].where).toEqual({
                '$tags_items_Items.tags_items.item_id$': { [db.Sequelize.Op.col]: 'Items.id' },
                '$tags_items_Items.tags_items.tag_id$': 1
            });
            expect(result).toEqual(mockItems);
        });

        it('should handle an error when retrieving items', async () => {
            const mockError = new Error('database error');
            db.Items.findAll.rejects(mockError);

            const consoleErrorStub = sandbox.stub(console, 'error');

            await itemRepository.getNewList();

            expect(db.Items.findAll.calledOnce).toBe(true);
            expect(consoleErrorStub.calledOnceWith('error', mockError)).toBe(true);
        });
    })

    describe('test readItem method', () => {
        it('should return items with the specified itemId', async () => {
            const itemId = 1;
            db.Items.findAll.resolves(mockItems);

            const result = await itemRepository.readItem(itemId);

            expect(db.Items.findAll.calledOnce).toBe(true);
            expect(db.Items.findAll.firstCall.args[0].where).toEqual({ id: itemId })
            expect(result).toEqual(mockItems);
        });

        it('should handle an error when retrieving items', async () => {
            const mockError = new Error('database Error');
            db.Items.findAll.rejects(mockError);

            const consoleErrorStub = sandbox.stub(console, 'error');

            await itemRepository.readItem();

            expect(db.Items.findAll.calledOnce).toBe(true);
            expect(consoleErrorStub.calledOnceWith(mockError)).toBe(true);


        })
    })

    describe('test deleteItem method', () => {
        const itemName = 'itemName';

        it('should delete an item and return the result', async () => {
            const destroyStub = sandbox.stub(db.Items, 'destroy').resolves(1);

            const result = await itemRepository.deleteItem(itemName);

            expect(destroyStub.calledOnceWith({ where: { name: itemName } })).toBe(true);
            expect(result).toEqual(1);
        });

        it('should handle an error during deletion', async () => {
            const mockError = new Error('Delete failed');

            const destroyStub = sandbox.stub(db.Items, 'destroy').rejects(mockError);
            const consoleErrorStub = sandbox.stub(console, 'error');

            await itemRepository.deleteItem(itemName);

            expect(destroyStub.calledOnceWith({ where: { name: itemName } })).toBe(true);
            expect(consoleErrorStub.calledOnceWith(mockError)).toBe(true);
        });
    })

    describe('test updateItem method', () => {
        const updateItemName = 'itemToUpdate';
        const name = 'itemName';
        const description = 'new description';
        const price = 100;
        const detail = 'new detail';
        const max_amount = 50;
        const stock = 10;

        it('should update the item with given details', async () => {
            const updateStub = sandbox.stub(db.Items, 'update').resolves([1]);

            const result = await itemRepository.updateItem(updateItemName, name, description, price, detail, max_amount, stock);

            expect(updateStub.calledOnce).toBe(true);
            expect(updateStub.firstCall.args[1]).toEqual({ where: { name: updateItemName } });
            expect(result).toBe(1);
        });

        it('', async () => {
            const updateStub = sandbox.stub(db.Items, 'update');
            const errorMessage = 'Something went wrong';
            updateStub.rejects(new Error(errorMessage));

            const consoleErrorStub = sandbox.stub(console, 'error');

            try {
                await itemRepository.updateItem(updateItemName, name, description, price, detail, max_amount, stock);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }
            expect(updateStub.firstCall.args[1]).toEqual({ where: { name: 'itemToUpdate' } });
            expect(consoleErrorStub.calledOnceWith(errorMessage)).toBe(true);
        })
    })

});