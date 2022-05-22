const { Router } = require('express');
const { getCart, addItemToCart } = require('../controllers/cartController');
const { authCheck } = require('../middleware/authCheck');

const routes = Router();

routes.get('/', authCheck, getCart);
routes.post('/addItem/:primaryCategoryId/:productId/:src', authCheck, addItemToCart);

module.exports = routes;
