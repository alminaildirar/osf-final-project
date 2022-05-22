const { Router } = require('express');
const {
    getCart,
    addItemToCart,
    removeItemFromCart,
} = require('../controllers/cartController');
const { authCheck } = require('../middleware/authCheck');

const routes = Router();

routes.get('/', authCheck, getCart);
routes.post(
    '/addItem/:primaryCategoryId/:productId/:src',
    authCheck,
    addItemToCart
);
routes.delete(
    '/removeItem/:productId/:variantId',
    authCheck,
    removeItemFromCart
);

module.exports = routes;
