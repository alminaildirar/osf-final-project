const { getCategoriesByParentId } = require('../services/CategoryService');

//-------------Get Index Page-------------------
const getIndexPage = async (req, res, next) => {
    try {
        const roots = await getCategoriesByParentId('root');
        res.status(200).render('index', { roots });
    } catch (error) {
        next(error);
    }
};

//-------------Get Login Page----------------------
const getLoginPage = async (req, res, next) => {
    const successMessages = req.cookies.successMessages;
    try {
        //If the user is already logged in user redirected to the home page
        if (userIN) return res.redirect('/');
        res.status(200).render('login', { successMessages });
    } catch (error) {
        next(error);
    }
};

//--------------Get Register Page -------------------
const getRegisterPage = async (req, res, next) => {
    try {
        if (userIN) return res.redirect('/');
        res.status(200).render('register');
    } catch (error) {
        next(error);
    }
};

module.exports = { getIndexPage, getLoginPage, getRegisterPage };
