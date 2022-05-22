const config = require('../config');
const RegisterError = require('../exceptions/RegisterError');
const LoginError = require('../exceptions/LoginError');
const moment = require('moment');
const { registerRequest, loginRequest } = require('../services/AuthService');
const { getCategoriesByParentId } = require('../services/CategoryService');
const { wishProductsLength } = require('../services/WishlistService');
const { cartProductsLength } = require('../services/CartService');

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
                maxAge: 900000,
            });
            res.cookie(
                'user',
                {
                    email: responseData.user.email,
                    name: responseData.user.name,
                    createdAt: responseData.user.createdAt,
                },
                {
                    httpOnly: true,
                    maxAge: 900000,
                }
            );
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
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

const getProfile = async (req, res, next) => {
    const token = req.cookies.token;
    const user = req.cookies.user;
    try {
        const roots = await getCategoriesByParentId('root');
        user.createdAt = moment(user.createdAt).add(1, 'year').format('LL');
        const wishProductsNumber = await wishProductsLength(token);
        const cartProductsNumber = await cartProductsLength(token);

        return res.status(200).render('profile', {
            roots,
            user,
            wishProductsNumber,
            cartProductsNumber,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout, getProfile };
