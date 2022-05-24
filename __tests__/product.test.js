const request = require('supertest');
const app = require('../src/app');
const {
    getProductsByCategoryId,
    getProductById,
    getProductImages,
    findProductsParentCategory,
    checkProductHasSubCategory,
} = require('../src/services/ProductService');

const testData = require('../testData/data');

describe('PRODUCT API', () => {
    it('Should get products', async (done) => {
        const primaryCategoryId = 'mens-clothing-jackets';
        await request(app).get(`/products/${primaryCategoryId}`);
        expect(200);
        done();
    });
    it('Should get single product', async (done) => {
        const primaryCategoryId = 'mens-clothing-jackets';
        const id = 21736758;
        await request(app).get(`/products/${primaryCategoryId}/${id}`);
        expect(200);
        done();
    });
});

describe('PRODUCT SERVICES', () => {
    it('Should get products by category id', async (done) => {
        const res = await getProductsByCategoryId('mens-clothing-jackets');
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    primary_category_id: 'mens-clothing-jackets',
                }),
            ])
        );
        done();
    });
    it('Should get product by id', async (done) => {
        const id = '11736753';
        const res = await getProductById(id);
        expect(res.id).toBe(id);
        done();
    });
    it("Should get product's image link (view type:large ones)'", (done) => {
        const data = [
            'products/large/B0574244_E3J_0.jpg',
            'products/large/B0574244_E3J_B0.jpg',
            'products/large/B0574244_E3J_L1.jpg',
        ];
        const res = getProductImages(testData.product[0]);
        expect(res).toEqual(data);
        done();
    });
    it('Should get parent category of subcategory', async (done) => {
        const categoryId = 'mens-clothing-shorts';
        const res = await findProductsParentCategory(categoryId);
        expect(res).toEqual("mens-clothing");
        done();
    });
    it('Should get false if category is not exist', async (done) => {
        const categoryId = 'test-category';
        const res = await findProductsParentCategory(categoryId);
        expect(res).toBe(false);
        done();
    });
    it('Should get parent names of categories',  (done) => {
        const parentNames ={
            root: 'mens',
            parent: 'clothing',
          }
         const primaryCategoryId =  "mens-clothing-jackets"
         const parentCategory = "mens-clothing"
         const data = {
            root: 'mens',
            parent: 'clothing',
            sub: 'clothing-jackets',
            subName: 'clothing-jackets'
          }
        const res =  checkProductHasSubCategory(parentNames, primaryCategoryId, parentCategory);
        expect(res).toEqual(data);
        done();
    });
    
});
