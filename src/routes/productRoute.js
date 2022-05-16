const { Router } = require('express');
const productController = require('../controllers/productController');

const routes = Router();

routes.get('/:primaryCategoryId', productController.getProducts);
routes.get('/:primaryCategoryId/:id', productController.getSingleProduct);

module.exports = routes;
