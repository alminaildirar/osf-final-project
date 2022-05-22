const { getCategoriesByParentId } = require('../services/CategoryService');
const { getCartRequest, getCartProducts } = require('../services/CartService');

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

module.exports = { getCart };
