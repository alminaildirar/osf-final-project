const { getData } = require('./DataService');
const config = require('../config');

//---------- Get Category By Id -----------------
const getCategoryById = async (rootCategoryId) => {
    return await getData(
        `${config.api.url}categories/${rootCategoryId}?secretKey=${config.api.key}`
    );
};

//----------- Get Categories By Parent Id -------------
const getCategoriesByParentId = async (parentCategoryId) => {
    return await getData(
        `${config.api.url}categories/parent/${parentCategoryId}?secretKey=${config.api.key}`
    );
};

//-------------Get All Categories (For Search)---------
const getAllCategories = async () => {
    return await getData(
        `${config.api.url}categories?secretKey=${config.api.key}`
    );
};

module.exports = { getCategoryById, getCategoriesByParentId, getAllCategories };
