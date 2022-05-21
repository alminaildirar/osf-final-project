const express = require('express');
const dotenv = require('dotenv');
const config = require('./config');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

//------Init Express App---------
const app = express();
//------Template Engine----------
app.set('view engine', 'ejs');
//----------Middleware-----------
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

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

//---------Error Handler Middleware-----
app.use(errorHandler);

app.listen(config.app.port, () =>
    console.log(`Server running on PORT ${config.app.port}`)
);
