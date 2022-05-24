const request = require('supertest');
const app = require('../src/app');
const {
    getCategoryById,
    getCategoriesByParentId,
    getAllCategories,
} = require('../src/services/CategoryService');

describe('CATEGORY API', () => {
    it('Should get root categories', async (done) => {
        const root = 'mens';
        await request(app).get(`/categories/${root}`);
        expect(200);
        done();
    });
    it('Should get parent categories', async (done) => {
        const root = 'mens';
        const parent = 'mens-clothing';
        await request(app).get(`/categories/${root}/${parent}`);
        expect(200);
        done();
    });
});

describe('CATEGORY SERVICES', () => {
    it('Should get category by id', async (done) => {
        const res = await getCategoryById('mens');
        expect(res.id).toBe('mens');
        done();
    });
    it('Should get categories by parent id', async (done) => {
        const res = await getCategoriesByParentId('mens');
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    parent_category_id: 'mens',
                }),
            ])
        );
        done();
    });
    it('Should get all categories', async (done) => {
        const res = await getAllCategories();
        expect(res.length).toBeGreaterThan(0);
        done()
    });
});
