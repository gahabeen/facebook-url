const { FB_CATEGORIES, FB_PATH, HOSTNAMES, PROTOCOLS } = require('./constants');
const fbid = require('./fbid');
const utils = require('./utils');

const isParsedObject = (parsedOrIdentifier, load = true) => {
    const isParsed = utils.isPlainObject(parsedOrIdentifier) && parsedOrIdentifier['#parsed'];
    if (isParsed && load) {
        parsedOrIdentifier.load();
    }
    return isParsed;
};

const getCategory = (parsedOrIdentifier, potentialCategory) => {
    let category = potentialCategory;

    if (category) {
        // If category object, check if it has an id
        if (utils.isPlainObject(category) && 'id' in category) {
            return category;
        }

        // If category key, then get the category
        if (typeof category === 'string') {
            if (category in FB_CATEGORIES) {
                category = FB_CATEGORIES[category];
            }

            return category;
        }
    }

    if (isParsedObject(parsedOrIdentifier, true)) {
        try {
            return parsedOrIdentifier.data.categories[0];
        } catch (error) {
            // Silent error
        }
    }
};

const getCategoryId = (parsedOrIdentifier, potentialCategory) => {
    const category = getCategory(parsedOrIdentifier, potentialCategory);
    return category ? category.id : '{categoryId}';
};

const getCategorySegment = (parsedOrIdentifier, potentialCategory) => {
    const category = getCategory(parsedOrIdentifier, potentialCategory);
    return category ? category.segment : (potentialCategory || '{categorySegment}');
};

const getIdentifier = (parsedOrIdentifier, key) => {
    let identifier = parsedOrIdentifier;
    if (isParsedObject(parsedOrIdentifier, true)) {
        try {
            identifier = parsedOrIdentifier.data[key].identifier;
        } catch (error) {
            // Silent error
        }
    }

    return typeof identifier === 'string' ? identifier : '';
};

const getAnyId = (identifier, key, providedId) => {
    const { id, slug } = fbid.identify(providedId || getIdentifier(identifier, key));
    const result = id || slug || identifier;
    return typeof result === 'string' ? result : `{${key}}`;
};

const getId = (identifier, key, providedId) => {
    const { id } = fbid.identify(providedId || getIdentifier(identifier, key));
    return typeof id === 'string' ? id : `{${key}}`;
};

const checkStrictKey = (segment) => {
    if (segment.trim().startsWith('{') && segment.trim().endsWith('}')) {
        throw new Error(`Couldn't find the provided ${segment} (strict mode)`);
    }
    return segment;
};

const craft = (identifier, options) => {
    const { hostname = HOSTNAMES.default, protocol = PROTOCOLS.secured, strict = true } = options || {};
    const rootUrl = `${protocol}://${hostname}`;

    const wrap = (fn) => (...params) => (strict ? checkStrictKey(fn(...params)) : fn(...params));
    const strictGetAnyId = wrap(getAnyId);
    const strictGetCategoryId = wrap(getCategoryId);
    const strictGetCategorySegment = wrap(getCategorySegment);
    const strictGetId = wrap(getId);

    return {
        aRoot() {
            return rootUrl;
        },
        aPage({ page } = {}) {
            return `${rootUrl}/${strictGetAnyId(identifier, 'page', page)}`;
        },
        aPageAbout({ page } = {}) {
            return `${rootUrl}/${strictGetAnyId(identifier, 'page', page)}${FB_PATH.PAGE__ABOUT}`;
        },
        aPageAsPg({ page } = {}) {
            return `${rootUrl}${FB_PATH.PG}/${strictGetAnyId(identifier, 'page', page)}`;
        },
        aPageAsPageCategory({ page, category } = {}) {
            // eslint-disable-next-line max-len
            return `${rootUrl}${FB_PATH.PAGES_CATEGORY}/${strictGetCategorySegment(identifier, category)}/${strictGetAnyId(identifier, 'page', page)}`;
        },
        aPlace({ place } = {}) {
            return `${rootUrl}${FB_PATH.PLACES}/${strictGetAnyId(identifier, 'place', place)}`;
        },
        aPlaceAndCategory({ place, category } = {}) {
            return `${rootUrl}${FB_PATH.PLACES}/x/${strictGetId(identifier, 'place', place)}/${strictGetCategoryId(identifier, category)}`;
        },
        aUser({ user } = {}) {
            return `${rootUrl}/${strictGetId(identifier, 'user', user)}`;
        },
    };
};

module.exports = { craft, HOSTNAMES, PROTOCOLS, CATEGORIES: FB_CATEGORIES };
