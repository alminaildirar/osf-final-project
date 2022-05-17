const BaseError = require('./baseError');
const { httpStatusCodes } = require('./httpStatusCodes');

class RegisterError extends BaseError {
    constructor(message, statusCode = httpStatusCodes.BAD_REQUEST) {
        super(message, statusCode);
    }
}

module.exports = RegisterError;
