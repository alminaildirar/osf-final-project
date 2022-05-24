const request = require('supertest');
const app = require('../src/app')

const uniqueMail = Math.random().toString(36).substr(2, 16);

describe('AUTH API', () => {
    it('Should signup a new user', async (done) => {
        await request(app)
            .post('/auth/register')
            .send({
                name: 'test',
                email: `${uniqueMail}@test.alibazon.com`,
                password: '1234',
            })
            .expect(302);
        done();
    });

    it('Should not signup a new user with taken email', async (done) => {
        await request(app)
            .post('/auth/register')
            .send({
                name: 'test',
                email: 'test@gmail.com',
                password: '123',
            })
            .expect(400);
        done();
    });

    it('Should signin an existing user', async (done) => {
        await request(app)
            .post('/auth/login')
            .send({
                email: 'test@gmail.com',
                password: '123',
            })
            .expect(302);
        done();
    });

    it('Should not signin an nonexisting user', async (done) => {
        await request(app)
            .post('/auth/login')
            .send({
                email: `${uniqueMail}@test.alibazon.com`,
                password: '123',
            })
            .expect(400);
        done();
    });

    it('Should user logout', (done) => {
        request(app).get('/auth/logout').expect(302);
        done();
    });
});
