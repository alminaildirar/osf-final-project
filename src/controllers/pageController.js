const { getCategoriesByParentId } = require('../services/CategoryService');

const getIndexPage = async (req, res, next) => {
    try {
        const roots = await getCategoriesByParentId('root');
        res.status(200).render('index', { roots });
    } catch (error) {
        console.log(error)
    }
};

const getLoginPage = async (req, res, next) => {
    try {
        if (userIN) return res.redirect('/');
        res.status(200).render('login');
    } catch (error) {
        next(error);
    }
};

const getRegisterPage = async (req, res, next) => {
    try {
        if (userIN) return res.redirect('/');
        res.status(200).render('register');
    } catch (error) {
        next(error);
    }
};

module.exports = { getIndexPage, getLoginPage, getRegisterPage };
