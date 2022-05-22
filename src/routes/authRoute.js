const { register, login, logout, getProfile } = require('../controllers/authController');
const { authCheck } = require('../middleware/authCheck')
const { Router } = require('express');

const routes = Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/logout', logout);
routes.get('/profile', authCheck, getProfile);

module.exports = routes;
