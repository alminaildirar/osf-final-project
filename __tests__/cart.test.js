const config = require('../src/config');
const testData = require('../testData/data');
const request = require('supertest');
const app = require('../src/app');
const { loginRequest } = require('../src/services/AuthService');
const {
    getCartRequest,
    getCartProducts,
    addItemToCartRequest,
    getCartProductsVariantIds,
    removeItemFromCartRequest,
    changeItemQuantityCartRequest,
    cartProductsLength,
} = require('../src/services/CartService');

beforeAll(async (done) => {
    const user = {
        secretKey: config.api.key,
        email: 'ildirar@gmail.com',
        password: '123',
    };
    const response = await loginRequest(user);
    token = response.token;
    done();
});

describe('CART API', () => {
    it("Should get user's cart", async (done) => {
        await request(app)
            .get('/cart')
            .set('Cookie', `token=${token}`)
            .expect(200);
        done();
    });
    it('Should add item to cart', async (done) => {
        const data = { color: 'P2V', size: '48', quantity: '1' };
        await request(app)
            .post('/cart/addItem/mens-clothing-jackets/21736758')
            .set('Cookie', `token=${token}`)
            .send(data);
        expect(200);
        done();
    });
    it('Should remove item from cart', async (done) => {
        await request(app)
            .delete('/cart/removeItem/21736758/883360541310')
            .set('Cookie', `token=${token}`);
        expect(200);
        done();
    });
    it('Should change quantity of item in cart', async (done) => {
        const data = { quantity: '3' };
        await request(app)
            .post('/cart/changeItemQuantity/21736758/883360541310')
            .set('Cookie', `token=${token}`)
            .send(data);
        expect(200);
        done();
    });
});

describe('CART SERVICES', () => {
    it('Should make get cart request', async (done) => {
        const res = await getCartRequest(token);
        expect(res.items.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it('Should get cart items', async (done) => {
        const res = await getCartRequest(token);
        const response = await getCartProducts(res.items);
        expect(response.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it("Should get cart items variant's name", async (done) => {
        const variant = { color: 'Beige', size: '40' };
        const exp = { color: 'E3J', size: '40' };
        const res = getCartProductsVariantIds(testData.product[0], variant);
        expect(res).toEqual(exp);
        done();
    });
    it('Should add item to cart', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '86736845',
            variantId: '883360544373',
            quantity: '2',
        };
        const res = await addItemToCartRequest(token, data);
        expect(res.items.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it('Should make remove item to cart request', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '86736845',
            variantId: '883360544373',
        };
        const res = await removeItemFromCartRequest(token, data);
        expect(res).toBeDefined();
        done();
    });
    it('Should make change quantity of cart item request', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '21736758',
            variantId: '883360541280',
            quantity: '2',
        };
        const res = await changeItemQuantityCartRequest(token, data);
        expect(res).toBeDefined();
        done();
    });
    it('Should make change quantity of cart item request', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '21736758',
            variantId: '883360541280',
            quantity: '2',
        };
        const res = await changeItemQuantityCartRequest(token, data);
        expect(res).toBeDefined();
        done();
    });
    it("Should get cart items' length", async (done) => {
        const res = await cartProductsLength(token);
        expect(res).toBeDefined();
        expect(res).toBeGreaterThanOrEqual(1);
        done();
    });
});
