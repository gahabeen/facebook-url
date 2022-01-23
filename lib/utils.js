const { URL } = require('url');

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
    if (isObject(o) === false) return false;

    // If has modified constructor
    const ctor = o.constructor;
    if (ctor === undefined) return true;

    // If has modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }

    // Most likely a plain Object
    return true;
}

function mergeDeep(target, source) {
    for (const key of Object.keys(source)) {
        if (isPlainObject(source[key])) {
            Object.assign(source[key], mergeDeep(target[key], source[key]));
        }
    }

    Object.assign(target || {}, source);
    return target;
}

const getUrlDefinition = (url) => {
    try {
        return new URL(url);
    } catch (error) {
        // fail silently
        return new URL('http://error.lost');
    }
};

const getUrlPath = (url) => {
    if (typeof url !== 'string') return;
    try {
        return new URL(url).pathname;
    } catch (error) {
        return '';
    }
};

const getPathSegments = (path) => path.split(/\//).filter(Boolean);

module.exports = { isObject, isPlainObject, mergeDeep, getUrlDefinition, getUrlPath, getPathSegments };
