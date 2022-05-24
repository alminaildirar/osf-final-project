const { Router } = require('express');
const { createOrder, getOrder } = require('../controllers/orderController');
const { authCheck } = require('../middleware/authCheck');
const routes = Router();

routes.get('/', authCheck, getOrder);
routes.post('/createOrder', authCheck, createOrder);

module.exports = routes;
