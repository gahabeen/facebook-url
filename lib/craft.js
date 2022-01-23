const { FB_ROOT, FB_PATH } = require('./constants');
const fbid = require('./fbid');
const utils = require('./utils');

const getCategory = (parsedOrIdentifier, potentialCategory) => {
    let category = potentialCategory;
    if (!potentialCategory && utils.isPlainObject(parsedOrIdentifier) && parsedOrIdentifier['#parsed']) {
        try {
            category = parsedOrIdentifier.data.categories[0].segment;
        } catch (error) {
            // Silent error
        }
    }

    if (utils.isPlainObject(category)) {
        try {
            category = category.segment;
        } catch (error) {
            // Silent error
        }
    }

    return typeof category === 'string' ? category : '';
};

const getIdentifier = (parsedOrIdentifier, key) => {
    let identifier = parsedOrIdentifier;
    if (utils.isPlainObject(parsedOrIdentifier) && parsedOrIdentifier['#parsed']) {
        try {
            identifier = parsedOrIdentifier.data[key].identifier;
        } catch (error) {
            // Silent error
        }
    }

    return typeof identifier === 'string' ? identifier : '';
};

const getId = (identifier, key) => {
    const { id, slug } = fbid.identify(getIdentifier(identifier, key));
    return id || slug || identifier;
};

const craft = {
    aPage(identifier) {
        return `${FB_ROOT}/${getId(identifier, 'page')}`;
    },
    aPageAbout(identifier) {
        return `${FB_ROOT}/${getId(identifier, 'page')}${FB_PATH.PAGE__ABOUT}`;
    },
    aPageAsPg(identifier) {
        return `${FB_ROOT}${FB_PATH.PG}/${getId(identifier, 'page')}`;
    },
    aPageAsPageCategory(identifier, category) {
        return `${FB_ROOT}${FB_PATH.PAGES_CATEGORY}/${getCategory(identifier, category)}/${getId(identifier, 'page')}`;
    },
};

const onMobile = new Proxy(craft, {
    get(target, key) {
        return new Proxy(target[key], {
            apply(fn, thisArg, args) {
                return fn.call(thisArg, ...args)
                    .replace('www.facebook.com', 'm.facebook.com');
            },
        });
    },
});

module.exports = { ...craft, onMobile };
