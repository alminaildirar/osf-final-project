const BadRequestError = require('../exceptions/BadRequestError');
const { getCartRequest } = require('../services/CartService');
const {
    generatePaymentId,
    createOrderRequest,
    getOrderRequest,
} = require('../services/OrderService');
const { getCategoriesByParentId } = require('../services/CategoryService');
const config = require('../config');

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

const createOrder = async (req, res, next) => {
    const token = req.cookies.token;
    const address = req.body.address;

    try {
        if(!(address.trim())){
            res.cookie('failMessages', "Address is required", {
                httpOnly: true,
                maxAge: 900000,
            });
            return res.status(404).redirect(`/cart`);
        }
        const cart = await getCartRequest(token);
        if (!cart.items) throw new BadRequestError();
        const paymentId = generatePaymentId();
        const data = {
            secretKey: config.api.key,
            address,
            paymentId,
            items: cart.items,
        };

        const response = await createOrderRequest(data, token);

        if (response.error) {
            res.cookie('failMessages', response.error, {
                httpOnly: true,
                maxAge: 900000,
            });
            return res.status(404).redirect(`/cart`);
        }

        res.cookie('successMessages', 'Your order is successfully created.', {
            httpOnly: true,
            maxAge: 900000,
        });
        res.status(200).redirect('/cart');
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getOrder };
