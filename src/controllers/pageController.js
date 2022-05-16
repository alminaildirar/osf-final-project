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
        //Note => Token check will added to prevent the logged in user from going to the login page
        res.status(200).render('login');
    } catch (error) {
        next(error);
    }
};


module.exports = { getIndexPage, getLoginPage };
