const BaseError = require('./baseError');
const { httpStatusCodes } = require('./httpStatusCodes');

class BadRequestError extends BaseError {
    constructor(
        message = 'Not found.',
        statusCode = httpStatusCodes.BAD_REQUEST
    ) {
        super(message, statusCode);
    }
}

module.exports = BadRequestError;
