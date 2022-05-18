const BadRequestError = require('../exceptions/BadRequestError');
const { getCategoriesByParentId } = require('../services/CategoryService');
const {
    getWishlistRequest,
    getWishProducts,
} = require('../services/WishlistService');

const getWishlist = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const roots = await getCategoriesByParentId('root');
        const response = await getWishlistRequest(token);
        if (response.error === 'There is no wishlist created for this user') {
            throw new BadRequestError(
                'There are no products in your wishlist.'
            );
        }
        const wishProducts = await getWishProducts(response.items);
        res.status(200).render('wish', { roots, wishProducts });
    } catch (error) {
        next(error);
    }
};

module.exports = { getWishlist };
