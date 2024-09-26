const db = require('../../models');
const itemRepository = require('../itemRepository');
const { sequelize } = db;
const { expect } = require('@jest/globals')

describe('test getAll method', () => {
    let transaction;
    beforeAll(async () => {
        jest.setTimeout(20000);

        try {
            await sequelize.sync({ force: false });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

            transaction = await db.sequelize.transaction();

            await db.Main_categories.bulkCreate([
                { id: 1, name: 'name1' },
                { id: 2, name: 'name2' },
            ], { transaction })

            await db.Sub_categories.bulkCreate([
                { id: 1, name: 'name1', main_category_id: 1, },
                { id: 2, name: 'name2', main_category_id: 1, }
            ], { transaction })

            await db.Items.bulkCreate([
                { id: 1, name: 'Item1', price: 100, description: 'Desc1', sub_category_id: 1, max_amount: 10, stock: 10, detail: 'detail1', detail_image: 'detail1' },
                { id: 2, name: 'Item2', price: 10, description: 'Desc2', sub_category_id: 2, max_amount: 10, stock: 10, detail: 'detail2', detail_image: 'detail2' },
            ], { transaction });

            await db.Likes.bulkCreate([
                { id: 1, item_id: 1, user_id: 1 }, { id: 2, item_id: 2, user_id: 2 }, { id: 3, item_id: 1, user_id: 2 }
            ], { transaction });

            await transaction.commit();
            console.log('completed commit');

        } catch (error) {
            console.error('Error in getAll beforeAll: ', error);
            if (transaction) await transaction.rollback();
        }
    });


    afterAll(async () => {
        jest.setTimeout(20000)
        try {
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
            await db.Items.destroy({ where: {}, truncate: true });
            await db.Likes.destroy({ where: {}, truncate: true });
            await db.Main_categories.destroy({ where: {}, truncate: true });
            await db.Sub_categories.destroy({ where: {}, truncate: true });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        } catch (error) {
            console.error('error in getAll afterAll: ', error);
        }

    });

    it('should equal likeCount in items like numbers', async () => {
        const sort = 'likeCount';
        const order = 'DESC';
        const limit = 10;
        const offset = 0;

        const result = await itemRepository.getAll(sort, order, limit, offset);

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].likeCount).toBeDefined();
        expect(result[0].likeCount).toBe(2);
    })

    it('should include price, should correct price in items', async () => {
        const sort = 'price';
        const order = 'DESC';
        const limit = 10;
        const offset = 0;

        const result = await itemRepository.getAll(sort, order, limit, offset);

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].price).toBeDefined();
        expect(result[0].price).toBe("100.0");
        expect(result[1].price).toBe("10.0")
    })
})

describe('test getMainList method', () => {
    let transaction;

    beforeAll(async () => {
        jest.setTimeout(20000)
        try {
            await sequelize.sync({ force: false });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

            transaction = await db.sequelize.transaction();

            await db.Main_categories.bulkCreate([
                { id: 1, name: 'name1' },
                { id: 2, name: 'name2' },
            ], { transaction })

            await db.Sub_categories.bulkCreate([
                { id: 1, name: 'name1', main_category_id: 1, },
                { id: 2, name: 'name2', main_category_id: 1, }
            ], { transaction })

            await db.Items.bulkCreate([
                { id: 1, name: 'Item1', price: 100, description: 'Desc1', sub_category_id: 1, max_amount: 10, stock: 10, detail: 'detail1', detail_image: 'detail1' },
                { id: 2, name: 'Item2', price: 10, description: 'Desc2', sub_category_id: 2, max_amount: 10, stock: 10, detail: 'detail2', detail_image: 'detail2' },
            ], { transaction })

            await db.Likes.bulkCreate([
                { id: 1, item_id: 1, user_id: 1 }, { id: 2, item_id: 2, user_id: 2 }, { id: 3, item_id: 1, user_id: 2 }
            ], { transaction });

            await transaction.commit();
            console.log('completed commit');


        } catch (error) {
            console.error('error in getMainList beforeAll: ', error);
            if (transaction) await transaction.rollback();
        }
    })

    afterAll(async () => {
        jest.setTimeout(20000)
        try {
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
            await db.Items.destroy({ where: {}, truncate: true });
            await db.Likes.destroy({ where: {}, truncate: true });
            await db.Main_categories.destroy({ where: {}, truncate: true });
            await db.Sub_categories.destroy({ where: {}, truncate: true });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        } catch (error) {
            console.error('error in getMainList afterAll: ', error);
        }
    })

    it('', async () => {
        const main_Category_id = 1;
        const sort = 'likeCount';
        const order = 'DESC';
        const limit = 10;
        const offset = 0;

        const result = await itemRepository.getMainList(main_Category_id, sort, order, limit, offset);

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].likeCount).toBeDefined();
        expect(result[0].likeCount).toBe(2);
        expect(result[0].sub_category_id).toBe(1);
    })
})

describe('test deleteItem method', () => {
    let transaction;

    beforeAll(async () => {
        jest.setTimeout(20000);
        try {
            await sequelize.sync({ force: false });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

            await db.Main_categories.bulkCreate([
                { id: 1, name: 'name1' },
                { id: 2, name: 'name2' },
            ]);

            await db.Sub_categories.bulkCreate([
                { id: 1, name: 'name1', main_category_id: 1, },
                { id: 2, name: 'name2', main_category_id: 1, }
            ]);

            await db.Items.bulkCreate([
                { id: 1, name: 'Item1', price: 100, description: 'Desc1', sub_category_id: 1, max_amount: 10, stock: 10, detail: 'detail1', detail_image: 'detail1' },
                { id: 2, name: 'Item2', price: 10, description: 'Desc2', sub_category_id: 2, max_amount: 10, stock: 10, detail: 'detail2', detail_image: 'detail2' },
            ])

            // await transaction.commit();
            console.log('completed commit');

        } catch (error) {
            console.error('error in deleteItem beforeAll');
            // if (transaction) await await transaction.rollback();
        }
    })

    afterAll(async () => {
        jest.setTimeout(20000);
        try {
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
            await db.Items.destroy({ where: {}, truncate: true });
            await db.Main_categories.destroy({ where: {}, truncate: true });
            await db.Sub_categories.destroy({ where: {}, truncate: true });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
            await sequelize.close();
        } catch (error) {
            console.error('error in deleteItem afterAll')
        }
    })

    it('', async () => {
        const itemName = 'name1';

        const result = await itemRepository.deleteItem(itemName);

        expect(result).toBe(1);

        const deleteItem = await db.Items.findOne({
            where: { name: itemName },
        })

        expect(deleteItem).toBeNull();
    })
})

describe('test updateItem method', () => {
    beforeAll(async () => {
        try {
            await sequelize.sync({ force: false });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

            await db.Main_categories.bulkCreate([
                { id: 1, name: 'name1' },
                { id: 2, name: 'name2' },
            ]);

            await db.Sub_categories.bulkCreate([
                { id: 1, name: 'name1', main_category_id: 1, },
                { id: 2, name: 'name2', main_category_id: 1, }
            ]);

            await db.Items.bulkCreate([
                { id: 1, name: 'Item1', price: 100, description: 'Desc1', sub_category_id: 1, max_amount: 10, stock: 10, detail: 'detail1', detail_image: 'detail1' },
                { id: 2, name: 'Item2', price: 10, description: 'Desc2', sub_category_id: 2, max_amount: 10, stock: 10, detail: 'detail2', detail_image: 'detail2' },
            ])
        } catch (error) {
            console.error('error in updateItem beforeAll');
        }
    })

    afterAll(async () => {
        try {
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
            await db.Items.destroy({ where: {}, truncate: true });
            await db.Sub_categories.destroy({ where: {}, truncate: true });
            await db.Main_categories.destroy({ where: {}, truncate: true });
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        } catch (error) {
            console.error('error in updateItem afterAlll');
        }
    })

    it('', async () => {
        const updateItemName = 'name1';
        const name = 'name3';
        const description = 'name3';
        const price = 500;
        const detail = 'name3';
        const max_amount = 10;
        const stock = 10;

        const result = await itemRepository.updateItem(updateItemName, name, description, price, detail, max_amount, stock);

        expect(result[0]).toBe(1);

        const updateItem = await db.Items.findOne({
            where: { name }
        })
        expect(updateItem.length).toBe(1)
    })
})