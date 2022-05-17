const config = require('../config');
const RegisterError = require('../exceptions/RegisterError');

const { registerRequest } = require('../services/AuthService');

const register = async (req, res, next) => {
    const { name, password, email } = req.body;

    try {
        if (password.length < 3) {
            throw new RegisterError(
                'Password must be at least 3 characters long.'
            );
        }
        const data = {
            secretKey: config.api.key,
            name,
            email,
            password,
        };
        const responseData = await registerRequest(data);
        if (responseData.error) {
            throw new RegisterError(responseData.error);
        } else {
            console.log(responseData.user);
            res.redirect('/login');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { register };
