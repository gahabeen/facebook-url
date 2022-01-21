const { URL } = require('url');
const memoize = require('./memoize');

exports.getUrlDefinition = memoize((url) => {
    try {
        return new URL(url);
    } catch (error) {
        // fail silently
        return new URL('');
    }
});

exports.getUrlPath = memoize((url) => {
    if (typeof url !== 'string') return;
    try {
        return new URL(url).pathname;
    } catch (error) {
        return '';
    }
});

exports.getPathSegments = memoize((path) => path.split(/\//).filter(Boolean));
