const axios = require('axios');
const config = require('../config');

const getWishlistRequest = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config.api.url}/wishlist?secretKey=${config.api.key}`,
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

module.exports = { getWishlistRequest };