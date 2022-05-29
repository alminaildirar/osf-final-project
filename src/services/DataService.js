const axios = require('axios');

//----------Get Data API Call----------
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

// -------- Post Data API Call ----------
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
