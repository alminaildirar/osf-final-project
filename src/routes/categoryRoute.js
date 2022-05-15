const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const routes = Router();

routes.get('/:category', categoryController.getRootCategories);
routes.get(
    '/:category/:parentCategoryId',
    categoryController.getParentCategories
);

module.exports = routes;
