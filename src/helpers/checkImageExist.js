const fs = require('fs');

const checkImageExist = (data) => {
    for (let i of data) {
        if (!i.image || !fs.existsSync('public/images/' + i.image)) {
            i.image = 'no-image-available.png';
        }
    }
};

module.exports = { checkImageExist };
