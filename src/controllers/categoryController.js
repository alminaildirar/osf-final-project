const {
    getCategoryById,
    getCategoriesByParentId,
} = require('../services/CategoryService');
const { checkImageExist } = require('../helpers/checkImageExist');
const { findParentName } = require('../helpers/findParentName');
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

//-----------Get Parent Categories-------------
const getParentCategories = async (req, res, next) => {
    const rootCategory = req.params.category;
    const parentCategoryId = req.params.parentCategoryId;

    try {
        if (rootCategory === parentCategoryId) {
            throw new BadRequestError('Category Not Found.');
        }
        const roots = await getCategoriesByParentId('root');
        const parentData = await getCategoriesByParentId(parentCategoryId);
        if (!parentData) throw new BadRequestError('Category Not Found.');
        checkImageExist(parentData);
        const parentNames = findParentName(parentCategoryId);

        return res.render('parentCategory', {
            roots,
            rootCategory,
            parentData,
            parentNames,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getRootCategories, getParentCategories };
