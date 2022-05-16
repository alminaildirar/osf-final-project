const { getCategoriesByParentId } = require('../services/CategoryService');

const getIndexPage = async (req, res) => {
    try {
        const roots = await getCategoriesByParentId('root');
        res.status(200).render('index', { roots });
    } catch (error) {
        next(error);
    }
};

module.exports = { getIndexPage };
