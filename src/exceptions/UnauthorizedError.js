const BaseError = require('./baseError');
const { httpStatusCodes } = require('./httpStatusCodes');

class UnauthorizedError extends BaseError {
    constructor(message, statusCode = httpStatusCodes.UNAUTHORİZED) {
        super(message, statusCode);
    }
}

module.exports = UnauthorizedError;
