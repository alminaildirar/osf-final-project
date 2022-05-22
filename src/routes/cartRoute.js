const { Router } = require('express');
const {
    getCart,
    addItemToCart,
    removeItemFromCart,
    changeItemQuantityCart,
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
routes.post(
    '/changeItemQuantity/:productId/:variantId',
    authCheck,
    changeItemQuantityCart
);

module.exports = routes;
