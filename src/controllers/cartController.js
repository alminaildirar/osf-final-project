const config = require('../config');
const { getCategoriesByParentId } = require('../services/CategoryService');
const {
    getCartRequest,
    getCartProducts,
    addItemToCartRequest,
    getCartProductsVariantIds,
} = require('../services/CartService');
const {
    findOrderableProductId,
    removeItemFromWishlistRequest,
} = require('../services/WishlistService');
const { getProductById } = require('../services/ProductService');

const getCart = async (req, res, next) => {
    const failMessages = req.cookies.failMessages;
    const successMessages = req.cookies.successMessages;
    const token = req.cookies.token;
    try {
        const roots = await getCategoriesByParentId('root');
        const response = await getCartRequest(token);
        if (response.error) {
            return res.status(400).render('cart', {
                roots,
                failMessages: response.error,
                successMessages,
            });
        }
        const cartProducts = await getCartProducts(response.items);

        res.status(200).render('cart', {
            roots,
            cartProducts,
            failMessages,
            successMessages,
        });
    } catch (error) {
        next(error);
    }
};

const addItemToCart = async (req, res, next) => {
    const token = req.cookies.token;
    const { productId, primaryCategoryId, src } = req.params;
    const quantity = req.body.quantity;
    let variant = req.body;
    delete variant.quantity;

    try {
        let path;
        src === 'product'
            ? (path = `/products/${primaryCategoryId}/${productId}`)
            : (path = '/wishlist');

        if (src === 'wish') {
            const product = await getProductById(productId);
            variant = getCartProductsVariantIds(product, variant);
        }

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
            return res.status(404).redirect(`${path}`);
        }

        const data = {
            secretKey: config.api.key,
            productId,
            variantId,
            quantity,
        };

        const response = await addItemToCartRequest(token, data);
        if (response.error) {
            res.cookie('failMessages', response.error, {
                httpOnly: true,
                maxAge: 900000,
            });
            return res.status(404).redirect(`${path}`);
        }

        await removeItemFromWishlistRequest(token, data);

        res.cookie(
            'successMessages',
            'This item added to your cart successfully :)',
            {
                httpOnly: true,
                maxAge: 900000,
            }
        );
        res.status(200).redirect(`${path}`);
    } catch (error) {
        next(error);
    }
};

module.exports = { getCart, addItemToCart };
