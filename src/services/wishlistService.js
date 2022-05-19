const axios = require('axios');
const config = require('../config');
const { getProductById } = require('../services/ProductService');

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

const getWishProducts = async (products) => {
    let wish = [];
    for (const item of products) {
        const product = await getProductById(item.productId);
        let wishItem = {};
        wishItem.name = product.name;
        wishItem.image = product.image_groups[0].images[0].link;
        wishItem.price = product.price;
        wishItem.variant = item.variant.variation_values;
        wishItem.quantity = item.quantity;
        wish.push(wishItem);
    }

    return wish;
};

module.exports = { getWishlistRequest, getWishProducts };