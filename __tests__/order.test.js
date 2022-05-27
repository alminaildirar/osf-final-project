const config = require('../src/config');
const testData = require('../testData/data');
const request = require('supertest');
const app = require('../src/app');
const { loginRequest } = require('../src/services/AuthService');
const { addItemToCartRequest } = require('../src/services/CartService');
const {
    getOrderRequest,
    createOrderRequest,
    generatePaymentId,
} = require('../src/services/OrderService');

const uniquePayment = Math.random().toString(36).substr(2, 16);

beforeAll(async (done) => {
    const user = {
        secretKey: config.api.key,
        email: 'ordertest@test.com',
        password: '123',
    };
    const response = await loginRequest(user);
    token = response.token;
    done();
});

describe('ORDER API', () => {
    it("Should get user's orders", async (done) => {
        await request(app)
            .get('/order')
            .set('Cookie', `token=${token}`)
            .expect(200);
        done();
    });
    it('Should create order', async (done) => {
        const cartData = {
            secretKey: config.api.key,
            productId: '86736845',
            variantId: '883360544373',
            quantity: '2',
        };
        await addItemToCartRequest(token, cartData);
        const data = { address: 'bahamas' };
        await request(app)
            .post('/order/createOrder')
            .set('Cookie', `token=${token}`)
            .send(data);
        expect(200);
        done();
    });
});

describe('ORDER SERVICES', () => {
    it('Should make get order request', async (done) => {
        const res = await getOrderRequest(token);
        expect(res.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it('Should make create order request', async (done) => {
        const cartData = {
            secretKey: config.api.key,
            productId: '86736845',
            variantId: '883360544373',
            quantity: '2',
        };
        const cart = await addItemToCartRequest(token, cartData);
        const orderData = {
            secretKey: config.api.key,
            address: 'bahamas',
            paymentId: uniquePayment,
            items: cart.items,
        };
        const res = await createOrderRequest(orderData, token);
        expect(res).toBeDefined();
        done();
    });
    it('Should generate unique payment id', (done) => {
        paymentId = generatePaymentId();
        expect(paymentId.length).toBeGreaterThan(5);
        done();
    });
});
