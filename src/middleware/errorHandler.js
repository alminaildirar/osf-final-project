const BadRequestError = require('../exceptions/BadRequestError');

const errorHandler = (error, req, res, next) => {
    if (error instanceof BadRequestError) {
        return res
            .status(error.statusCode)
            .render('index', { error: error.message });
    }
    return res.status(500).render('index', { error: 'Something went wrong' });
};

module.exports = { errorHandler };
