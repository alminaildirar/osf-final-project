module.exports = (app) => {
    app.use('/', require('./pageRoute'));
    app.use('/categories', require('./categoryRoute'));
};
