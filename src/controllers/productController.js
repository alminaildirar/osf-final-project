const { getCategoriesByParentId } = require('../services/CategoryService');
const {
    getProductsByCategoryId,
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
        next(error);
    }
};

module.exports = { getProducts };
