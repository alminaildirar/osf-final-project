const { getData } = require('./DataService');
const config = require('../config');
const { getAllCategories } = require('./CategoryService');

//------------Get Products By Category Id----------------
const getProductsByCategoryId = async (primaryCategoryId) => {
    return await getData(
        `${config.api.url}products/product_search?primary_category_id=${primaryCategoryId}&secretKey=${config.api.key}`
    );
};

//-------------Get Product By Id-------------------------
const getProductById = async (id) => {
    return (
        await getData(
            `${config.api.url}products/product_search?id=${id}&secretKey=${config.api.key}`
        )
    )[0];
};

//--This is used the check incorrect request by url ------
const findProductsParentCategory = async (categoryId) => {
    const category = (await getAllCategories()).filter((data) => {
        if (data.id == categoryId) return true;
    });

    const result = category[0] ? category[0].parent_category_id : false;
    return result;
};

//---Some categories do not have parent info, i check them for breadcrumb----
const checkProductHasSubCategory = (
    parentNames,
    primaryCategoryId,
    parentCategory
) => {
    if (!parentNames.sub) {
        parentNames.sub = primaryCategoryId.substring(
            primaryCategoryId.indexOf('-') + 1
        );
        parentNames.subName = parentNames.sub;
        parentNames.parent = parentCategory.substring(
            parentCategory.indexOf('-') + 1
        );
    }
    return parentNames;
};

//To get large images fr product detail page
const getProductImages = (product) => {
    return product.image_groups
        .filter((data) => {
            if (data.view_type == 'large') {
                return true;
            }
        })[0]
        .images.map((data) => data.link);
};

module.exports = {
    getProductsByCategoryId,
    getProductById,
    findProductsParentCategory,
    checkProductHasSubCategory,
    getProductImages,
};
