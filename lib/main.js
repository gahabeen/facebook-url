const { matchAll } = require('./match');

function facebookUrl(url) {
    return {
        ...matchAll(url),
    };
}

module.exports = facebookUrl;
