const request = require('supertest');
const app = require('../src/app');

describe('GET PAGES', () => {
    it('Should render the index page', async (done) => {
        await request(app).get('/').expect(200);
        done();
    });
    it('Should render the register page', (done) => {
        request(app).get('/register').expect(200);
        done();
    });
    it('Should render the login page', (done) => {
        request(app).get('/login').expect(200);
        done();
    });
});
