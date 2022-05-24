const { Router } = require('express');
const { createOrder } = require('../controllers/orderController');
const { authCheck } = require('../middleware/authCheck');
const routes = Router();

routes.get('/', authCheck, getOrder);

module.exports = routes;
