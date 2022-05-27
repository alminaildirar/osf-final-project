const axios = require('axios');

async function getData(url, data = {}) {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            data: data,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

async function authPost(url, data) {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: data,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

module.exports = { getData, authPost };
