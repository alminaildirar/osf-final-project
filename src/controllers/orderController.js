const BadRequestError = require('../exceptions/BadRequestError');
const { getOrderRequest } = require('../services/OrderService');
const { getCategoriesByParentId } = require('../services/CategoryService');

const getOrder = async (req, res, next) => {
    const failMessages = req.cookies.failMessages;
    const token = req.cookies.token;

    try {
        const roots = await getCategoriesByParentId('root');
        const orders = await getOrderRequest(token);
        if (orders.error) {
            return res.status(400).render('order', {
                roots,
                failMessages: orders.error,
            });
        }

        return res.status(200).render('order', {
            roots,
            failMessages,
            orders,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getOrder };
