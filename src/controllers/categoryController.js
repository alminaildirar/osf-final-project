const {
    getCategoryById,
    getCategoriesByParentId,
} = require('../services/CategoryService');
const { checkImageExist } = require('../helpers/checkImageExist');
const BadRequestError = require('../exceptions/BadRequestError');

//-----------Get Root Categories-------------
const getRootCategories = async (req, res, next) => {
    const mainCategoryId = req.params.category;

    try {
        const roots = await getCategoriesByParentId('root');
        const rootData = await getCategoryById(mainCategoryId);
        let parentData = await getCategoriesByParentId(mainCategoryId);
        if (!parentData || !rootData)
            throw new BadRequestError('Category Not Found.');

        checkImageExist(parentData);

        return res
            .status(200)
            .render('rootCategory', { roots, rootData, parentData });
    } catch (error) {
        next(error);
    }
};

const getParentCategories = async (req, res, next) => {};

module.exports = { getRootCategories, getParentCategories };
