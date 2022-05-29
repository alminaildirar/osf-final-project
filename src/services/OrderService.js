const { customAlphabet } = require('nanoid');
const axios = require('axios');
const config = require('../config');

//--------------Get Order Request ------------
const getOrderRequest = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config.api.url}/orders?secretKey=${config.api.key}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//------------Create Order Request To API------
const createOrderRequest = async (data, token) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${config.api.url}/orders`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: data,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//----------Gnerate Unıque Payment Id---------
const generatePaymentId = () => {
    const nanoid = customAlphabet('1234567890', 10);
    const paymentId = 'PI' + nanoid();
    return paymentId;
};

module.exports = { generatePaymentId, createOrderRequest, getOrderRequest };
