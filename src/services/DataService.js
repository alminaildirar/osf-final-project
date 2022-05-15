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
        next(error);
    }
}

module.exports = getData;
