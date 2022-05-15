const {
    getCategoryById,
    getCategoriesByParentId,
} = require('../services/CategoryService');

const getRootCategories = async (req, res, next) => {};

const getParentCategories = async (req, res, next) => {};

module.exports = { getRootCategories, getParentCategories };
