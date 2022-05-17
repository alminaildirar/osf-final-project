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

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const data = {
            secretKey: config.api.key,
            email,
            password,
        };
        const responseData = await loginRequest(data);
        if (responseData.error) {
            throw new LoginError(responseData.error);
        } else {
            res.cookie('token', responseData.token, {
                httpOnly: true,
                maxAge: 90000,
            });
            res.cookie('user', responseData.user.email, {
                httpOnly: true,
                maxAge: 90000,
            });
            res.redirect('/');
        }
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    try {
        if (!req.cookies.user || !req.cookies.token) {
            return res.redirect('/');
        }
        res.clearCookie('user');
        res.clearCookie('token');
        return res.redirect('/login');
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout };
