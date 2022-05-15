const dotenv = require('dotenv');
dotenv.config();

const config = {
    app: {
        port: parseInt(process.env.PORT) || 5000,
    },
    api: {
        url: String(process.env.BASE_URL),
        key: String(process.env.SECRET_KEY),
    },
};

module.exports = config;
