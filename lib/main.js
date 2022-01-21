const { matchAll } = require('./match');

function facebookUrl(url) {
    const parsed = matchAll(url)
    return {
        ...parsed,
    };
}

module.exports = facebookUrl;
