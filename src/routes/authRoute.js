const { register, login } = require('../controllers/authController');
const { Router } = require('express');

const routes = Router();

routes.post('/register', register);
routes.post('/login', login);

module.exports = routes;
