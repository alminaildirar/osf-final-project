const { Router } = require('express');
const { getIndexPage, getLoginPage, getRegisterPage } = require('../controllers/pageController');

const routes = Router();

routes.get('/', getIndexPage);
routes.get('/login', getLoginPage);
routes.get('/register', getRegisterPage);

module.exports = routes;
