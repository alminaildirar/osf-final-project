const { Router } = require('express');
const { getIndexPage } = require('../controllers/pageController');

const routes = Router();

routes.get('/', getIndexPage);

module.exports = routes;