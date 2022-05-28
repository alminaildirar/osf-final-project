const Sentry = require('@sentry/node');

const errorHandler = (error, req, res, next) => {
    let path;
    const status = error.statusCode || 500;
    let message = error.message;
    switch (error.constructor.name) {
        case 'LoginError':
            path = 'login';
            break;
        case 'RegisterError':
            path = 'register';
            break;
        case 'BadRequestError':
            path = 'index';
            break;
        case 'UnauthorizedError':
            path = 'login';
            break;
        default:
            path = 'index';
            Sentry.captureException(error);
            message = 'Something went wrong.';
    }
    res.status(status).render(`${path}`, { error: message });
};

module.exports = { errorHandler };
