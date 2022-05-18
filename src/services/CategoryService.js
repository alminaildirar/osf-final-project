const { getData } = require('./DataService');
const config = require('../config');

const getCategoryById = async (rootCategoryId) => {
    return await getData(
        `${config.api.url}categories/${rootCategoryId}?secretKey=${config.api.key}`
    );
};

const getCategoriesByParentId = async (parentCategoryId) => {
    return await getData(
        `${config.api.url}categories/parent/${parentCategoryId}?secretKey=${config.api.key}`
    );
};

const getAllCategories = async () => {
    return await getData(
        `${config.api.url}categories?secretKey=${config.api.key}`
    );
};

module.exports = { getCategoryById, getCategoriesByParentId, getAllCategories };
