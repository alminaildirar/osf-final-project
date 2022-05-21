const { Router } = require('express');
const {
    getWishlist,
    addItemToWishlist,
} = require('../controllers/wishlistController');
const { authCheck } = require('../middleware/authCheck');

const routes = Router();

routes.get('/', authCheck, getWishlist);
routes.post(
    '/addItem/:primaryCategoryId/:productId',
    authCheck,
    addItemToWishlist
);

module.exports = routes;
