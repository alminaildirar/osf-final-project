const { Router } = require('express');
const { getCart } = require('../controllers/cartController');
const { authCheck } = require('../middleware/authCheck');

const routes = Router();

routes.get('/', authCheck, getCart);

module.exports = routes;
