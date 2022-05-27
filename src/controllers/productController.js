const { getCategoriesByParentId } = require('../services/CategoryService');
const {
    getProductsByCategoryId,
    getProductById,
    getProductImages,
    findProductsParentCategory,
    checkProductHasSubCategory,
} = require('../services/ProductService');
const { findParentName } = require('../helpers/findParentName');
const BadRequestError = require('../exceptions/BadRequestError');

const getProducts = async (req, res, next) => {
    const primaryCategoryId = req.params.primaryCategoryId;

    try {
        const roots = await getCategoriesByParentId('root');
        const parentCategory = await findProductsParentCategory(
            primaryCategoryId
        );
        if (!parentCategory) {
            throw new BadRequestError('Category Not Found.');
        }
        const products = await getProductsByCategoryId(primaryCategoryId);
        let parentNames = findParentName(primaryCategoryId);
        if (!parentNames.sub) {
            parentNames = checkProductHasSubCategory(
                parentNames,
                primaryCategoryId,
                parentCategory
            );
        }
        return res.render('products', { roots, products, parentNames });
    } catch (error) {
        console.log(error);
    }
};

const getSingleProduct = async (req, res, next) => {
    const failMessages = req.cookies.failMessages;
    const successMessages = req.cookies.successMessages;
    const id = req.params.id;
    const primaryCategoryId = req.params.primaryCategoryId;

    try {
        const roots = await getCategoriesByParentId('root');
        const product = await getProductById(id);
        const parentCategory = await findProductsParentCategory(
            primaryCategoryId
        );
        let parentNames = findParentName(primaryCategoryId);
        if (!parentNames.sub) {
            parentNames = checkProductHasSubCategory(
                parentNames,
                primaryCategoryId,
                parentCategory
            );
        }

        const images = getProductImages(product);
        let orderable = true;
        if((product.variants).length === 0){
            orderable = false;
        }

        return res.render('singleProduct', {
            roots,
            product,
            parentCategory,
            primaryCategoryId,
            parentNames,
            images,
            orderable,
            failMessages,
            successMessages,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProducts, getSingleProduct };
