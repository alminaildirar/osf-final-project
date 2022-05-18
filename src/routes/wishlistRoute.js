const { Router } = require('express');
const { getWishlist } = require('../controllers/wishlistController');
const { authCheck } = require('../middleware/authCheck');

const routes = Router();

routes.get('/', authCheck, getWishlist);

module.exports = routes;
