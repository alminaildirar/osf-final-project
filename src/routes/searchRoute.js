const { Router } = require('express');
const { search } = require('../controllers/searchController');

const routes = Router();

routes.post('/', search);

module.exports = routes;
