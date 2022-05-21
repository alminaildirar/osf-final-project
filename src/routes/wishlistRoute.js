const { Router } = require('express');
const {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishlist,
} = require('../controllers/wishlistController');
const { authCheck } = require('../middleware/authCheck');

const routes = Router();

routes.get('/', authCheck, getWishlist);
routes.post(
    '/addItem/:primaryCategoryId/:productId',
    authCheck,
    addItemToWishlist
);
routes.delete(
    '/removeItem/:productId/:variantId',
    authCheck,
    removeItemFromWishlist
);

module.exports = routes;
