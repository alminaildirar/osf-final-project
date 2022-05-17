const { authPost } = require('./DataService');
const config = require('../config');

const registerRequest = async (data) => {
    return await authPost(`${config.api.url}auth/signup`, data);
};

const loginRequest = async (data) => {
    return await authPost( `${config.api.url}auth/signin`, data)
}

module.exports = { registerRequest, loginRequest };
