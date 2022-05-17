module.exports = (app) => {
    app.use('/', require('./pageRoute'));
    app.use('/categories', require('./categoryRoute'));
    app.use('/products', require('./productRoute'));
    app.use('/auth', require('./authRoute'));
};
