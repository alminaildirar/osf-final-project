const BadRequestError = require('../exceptions/BadRequestError');
const RegisterError = require('../exceptions/RegisterError');

const errorHandler = (error, req, res, next) => {
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
    return res.status(500).render('index', { error: 'Something went wrong' });
};

module.exports = { errorHandler };
