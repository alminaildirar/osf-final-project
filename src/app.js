const express = require('express');
const dotenv = require('dotenv');
const config = require('./config');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

dotenv.config();

//------Init Express App---------
const app = express();

//------Sentry Error Handler------
Sentry.init({
    dsn: config.sentry.dsn,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({
            app,
        }),
    ],
    tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
    op: 'test',
    name: 'My First Test Transaction',
});

Sentry.configureScope((scope) => {
    scope.setSpan(transaction);
});

//------Template Engine----------
app.set('view engine', 'ejs');
//----------Middleware-----------
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//--Global Variable--
global.userIN = null;

app.use('*', (req, res, next) => {
    res.clearCookie('failMessages');
    res.clearCookie('successMessages');
    userIN = req.cookies.user;
    next();
});

//---Prevent to receiving GET request to /favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

//----------Routes---------------
require('./routes/server')(app);

module.exports = app;
