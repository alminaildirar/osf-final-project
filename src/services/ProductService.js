const getData = require('./DataService');
const config = require('../config');

const getProductsByCategoryId = async (primaryCategoryId) => {
    return await getData(
        `${config.api.url}products/product_search?primary_category_id=${primaryCategoryId}&secretKey=${config.api.key}`
    );
};

const getProductById = async (id) => {
    return (
        await getData(
            `${config.api.url}products/product_search?id=${id}&secretKey=${config.api.key}`
        )
    )[0];
};

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
    getProductImages,
};
