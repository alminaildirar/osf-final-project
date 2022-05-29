const { authPost } = require('./DataService');
const config = require('../config');

//-----------Request For Register------------
const registerRequest = async (data) => {
    return await authPost(`${config.api.url}auth/signup`, data);
};

//----------Request For Login ---------------
const loginRequest = async (data) => {
    return await authPost(`${config.api.url}auth/signin`, data);
};

module.exports = { registerRequest, loginRequest };
