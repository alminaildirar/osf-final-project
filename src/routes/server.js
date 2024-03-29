module.exports = (app) => {
    app.use('/', require('./pageRoute'));
    app.use('/categories', require('./categoryRoute'));
    app.use('/products', require('./productRoute'));
    app.use('/auth', require('./authRoute'));
    app.use('/wishlist', require('./wishlistRoute'));
    app.use('/cart', require('./cartRoute'));
    app.use('/order', require('./orderRoute'));
    app.use('/search', require('./searchRoute'));
};
