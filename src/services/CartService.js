const axios = require('axios');
const config = require('../config');
const { getProductById } = require('../services/ProductService');

//--------Get Cart Request To API----------
const getCartRequest = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config.api.url}/cart?secretKey=${config.api.key}`,
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

//---------Get Cart Products ---------------
const getCartProducts = async (products) => {
    let cart = [];
    for (const item of products) {
        const product = await getProductById(item.productId);
        let cartItem = {};
        cartItem.name = product.name;
        cartItem.image = product.image_groups[0].images[0].link;
        cartItem.price = product.price;
        cartItem.id = product.id;
        cartItem.primaryCategoryId = product.primary_category_id;
        cartItem.variantId = item.variant.product_id;
        cartItem.variant = getCartProductsVariantNames(
            product,
            item.variant.variation_values
        );
        cartItem.quantity = item.quantity;
        cart.push(cartItem);
    }

    return cart;
};

//--------Get Cart Products Variants Names--------------
const getCartProductsVariantNames = (product, variant) => {
    let variantName = {};
    const variants = Object.keys(variant);
    for (let item of product.variation_attributes) {
        if (variants.includes(item.id)) {
            for (let values of item.values) {
                if (values.value === variant[item.id]) {
                    variantName[item.id] = values.name;
                }
            }
        }
    }

    return variantName;
};

//-------- Add Item To Cart Request ----------------
const addItemToCartRequest = async (token, data) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${config.api.url}/cart/addItem`,
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

//-------- Remove Item From Cart Request --------------
const removeItemFromCartRequest = async (token, data) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config.api.url}/cart/removeItem`,
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

//---------- Change Item Quantity Cart Request -----------
const changeItemQuantityCartRequest = async (token, data) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${config.api.url}/cart/changeItemQuantity`,
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

// ----------- Cart Products Length For Profile Page -------
const cartProductsLength = async (token) => {
    const cart = await getCartRequest(token);
    if (cart.error) {
        return 0;
    }
    return cart.items.length;
};

const calculateTotalPriceOfCart = (products) => {
    let totalprice = 0;
    products.forEach((product) => {
        totalprice += product.price * product.quantity;
    });
    return totalprice;
};

module.exports = {
    getCartRequest,
    getCartProducts,
    addItemToCartRequest,
    removeItemFromCartRequest,
    changeItemQuantityCartRequest,
    cartProductsLength,
    calculateTotalPriceOfCart,
};
