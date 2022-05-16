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

module.exports = {
    getProductsByCategoryId,
    getProductById
};
