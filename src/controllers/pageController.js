const { getCategoriesByParentId } = require('../services/CategoryService');

const getIndexPage = async (req, res) => {
    try {
        const roots = await getCategoriesByParentId('root');
        res.status(200).render('index', { roots });
    } catch (error) {
        next(error);
    }
};

const getLoginPage = async (req, res) => {
    try {
        if (userIN) return res.redirect('/');
        res.status(200).render('login');
    } catch (error) {
        next(error);
    }
};

const getRegisterPage = async (req, res) => {
    try {
        if (userIN) return res.redirect('/');
        res.status(200).render('register');
    } catch (error) {
        next(error);
    }
};

module.exports = { getIndexPage, getLoginPage, getRegisterPage };
