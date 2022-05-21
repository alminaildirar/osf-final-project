const config = require('../config');
const BadRequestError = require('../exceptions/BadRequestError');
const { getCategoriesByParentId } = require('../services/CategoryService');
const {
    getWishlistRequest,
    getWishProducts,
    findOrderableProductId,
    addItemToWishlistRequest,
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

const addItemToWishlist = async (req, res, next) => {
    const token = req.cookies.token;
    const { productId, primaryCategoryId } = req.params;
    const quantity = req.body.quantity;
    const variant = req.body;
    delete variant.quantity;

    try {
        const variantId = await findOrderableProductId(variant, productId);
        if (!variantId) {
            res.cookie(
                'failMessages',
                'This product does not have this variant',
                {
                    httpOnly: true,
                    maxAge: 900000,
                }
            );
            return res
                .status(404)
                .redirect(`/products/${primaryCategoryId}/${productId}`);
        }

        const data = {
            secretKey: config.api.key,
            productId,
            variantId,
            quantity,
        };

        const response = await addItemToWishlistRequest(token, data);
        if (response.error) {
            res.cookie('failMessages', response.error, {
                httpOnly: true,
                maxAge: 900000,
            });
            return res
                .status(404)
                .redirect(`/products/${primaryCategoryId}/${productId}`);
        }

        res.cookie(
            'successMessages',
            'This item added to your wishlist successfully :)',
            {
                httpOnly: true,
                maxAge: 900000,
            }
        );
        res.status(200).redirect(`/products/${primaryCategoryId}/${productId}`);
    } catch (error) {
        next(error);
    }
};

module.exports = { getWishlist, addItemToWishlist };
