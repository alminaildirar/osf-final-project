const BadRequestError = require('../exceptions/BadRequestError');
const RegisterError = require('../exceptions/RegisterError');
const LoginError = require('../exceptions/LoginError');
const UnauthorizedError = require('../exceptions/UnauthorizedError');

const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error instanceof BadRequestError) {
        return res
            .status(error.statusCode)
            .render('index', { error: error.message });
    }
    if (error instanceof RegisterError) {
        return res
            .status(error.statusCode)
            .render('register', { error: error.message });
    }
    if (error instanceof LoginError) {
        return res
            .status(error.statusCode)
            .render('login', { error: error.message });
    }
    if (error instanceof UnauthorizedError) {
        return res
            .status(error.statusCode)
            .render('login', { error: error.message });
    }
    return res.status(500).render('index', { error: 'Something went wrong' });
};

module.exports = { errorHandler };
