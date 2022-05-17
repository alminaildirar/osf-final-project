const { register } = require('../controllers/authController');
const { Router } = require('express');

const routes = Router();

routes.post('/register', register);

module.exports = routes;
