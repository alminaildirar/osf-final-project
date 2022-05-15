const axios = require('axios');
const getData = require('./DataService');
const config = require('../config');

const getCategoryById = async (rootCategoryId) => {
    return await getData(
        `${config.api.url}categories/${rootCategoryId}?secretKey=${config.api.key}`
    );
};

module.exports = { getCategoryById };