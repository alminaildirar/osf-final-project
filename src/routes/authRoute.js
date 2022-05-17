const { register, login, logout } = require('../controllers/authController');
const { Router } = require('express');

const routes = Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/logout', logout);

module.exports = routes;
