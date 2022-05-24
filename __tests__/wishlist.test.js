const config = require('../src/config');
const testData = require('../testData/data');
const request = require('supertest');
const app = require('../src/app');
const { loginRequest } = require('../src/services/AuthService');

const {
    getWishlistRequest,
    getWishProducts,
    getWishProductsVariantNames,
    addItemToWishlistRequest,
    getProductsOrderableVariants,
    removeItemFromWishlistRequest,
    changeItemQuantityRequest,
    wishProductsLength,
} = require('../src/services/WishlistService');

let token = '';

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

describe('Wishlist API', () => {
    it("Should get user's wishlist", async (done) => {
        await request(app)
            .get('/wishlist')
            .set('Cookie', `token=${token}`)
            .expect(200);
        done();
    });
    it('Should add item to wishlist', async (done) => {
        const data = { color: 'P2V', size: '48', quantity: '1' };
        await request(app)
            .post('/wishlist/addItem/mens-clothing-jackets/21736758')
            .set('Cookie', `token=${token}`)
            .send(data);
        expect(200);
        done();
    });
    it('Should remove item from wishlist', async (done) => {
        await request(app)
            .delete('/wishlist/removeItem/21736758/883360541310')
            .set('Cookie', `token=${token}`);
        expect(200);
        done();
    });
    it('Should change quantity of item in wishlist', async (done) => {
        const data = { quantity: '3' };
        await request(app)
            .post('/wishlist/changeItemQuantity/21736758/883360541310')
            .set('Cookie', `token=${token}`)
            .send(data);
        expect(200);
        done();
    });
});

describe('Wishlist Services', () => {
    it('Should make get wishlist request', async (done) => {
        const res = await getWishlistRequest(token);
        expect(res.items.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it('Should get wishlist items', async (done) => {
        const res = await getWishlistRequest(token);
        const response = await getWishProducts(res.items);
        expect(response.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it("Should get wishlist items variant's value", (done) => {
        const variant = { color: 'E3J', size: '40' };
        const exp = { color: 'Beige', size: '40' };
        const res = getWishProductsVariantNames(testData.product[0], variant);
        expect(res).toEqual(exp);
        done();
    });
    it('Should make add item to wishlist request', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '21736758',
            variantId: '883360541280',
            quantity: '2',
        };
        const res = await addItemToWishlistRequest(token, data);
        expect(res.items.length).toBeGreaterThanOrEqual(1);
        done();
    });
    it('Should make remove item to wishlist request', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '21736758',
            variantId: '883360541280',
        };
        const res = await removeItemFromWishlistRequest(token, data);
        expect(res).toBeDefined();
        done();
    });
    it("Should get product's orderable variants", async (done) => {
        const productId = '21736758';
        const res = await getProductsOrderableVariants(productId);
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    orderable: true,
                }),
            ])
        );
        done();
    });
    it('Should make change quantity of wishlist item request', async (done) => {
        const data = {
            secretKey: config.api.key,
            productId: '21736758',
            variantId: '883360541280',
            quantity: '2',
        };
        const res = await changeItemQuantityRequest(token, data);
        expect(res).toBeDefined();
        done();
    });
    it("Should get wishlist items' length", async (done) => {
        const res = await wishProductsLength(token);
        expect(res).toBeDefined();
        expect(res).toBeGreaterThanOrEqual(1)
        done()
    })
});

