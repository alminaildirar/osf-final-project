const config = require('../src/config');
const testData = require('../testData/data');
const request = require('supertest');
const app = require('../src/app');
const {
    findCategoriesWhichHaveProducts,
} = require('../src/services/SearchService');

describe('SEARCH API', () => {
    jest.setTimeout(30000);
    it('Should get search results', async (done) => {
        await request(app).post('/search').send({ search: 'test' }).expect(200);
        done();
    });
});
describe('SEARCH SERVICES', () => {
    it('Should find subcategories that have products', async (done) => {
        const res = await findCategoriesWhichHaveProducts();
        expect(res.length).toBeDefined();
        expect(res.length).toBeGreaterThanOrEqual(1);
        done();
    });
});
