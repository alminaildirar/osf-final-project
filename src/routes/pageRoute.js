const { Router } = require('express');
const { getIndexPage, getLoginPage } = require('../controllers/pageController');

const routes = Router();

routes.get('/', getIndexPage);
routes.get('/login', getLoginPage);

module.exports = routes;
