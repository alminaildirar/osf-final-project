const UnauthorizedError = require('../exceptions/UnauthorizedError');

const authCheck = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) throw new UnauthorizedError('Please login to gain access.');
        next()
    } catch (error) {
        next(error);
    }
};

module.exports = { authCheck };
