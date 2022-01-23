const { URL } = require('url');

exports.getUrlDefinition = (url) => {
    try {
        return new URL(url);
    } catch (error) {
        // fail silently
        return new URL('http://error.lost');
    }
};

exports.getUrlPath = (url) => {
    if (typeof url !== 'string') return;
    try {
        return new URL(url).pathname;
    } catch (error) {
        return '';
    }
};

exports.getPathSegments = (path) => path.split(/\//).filter(Boolean);
