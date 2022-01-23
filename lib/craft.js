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
    return category ? category.id : '';
};

const getCategorySegment = (parsedOrIdentifier, potentialCategory) => {
    const category = getCategory(parsedOrIdentifier, potentialCategory);
    return category ? category.segment : (potentialCategory || '');
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

const getAnyId = (identifier, key) => {
    const { id, slug } = fbid.identify(getIdentifier(identifier, key));
    const result = id || slug || identifier;
    return typeof result === 'string' ? result : `{${key}}`;
};

const getId = (identifier, key) => {
    const { id } = fbid.identify(getIdentifier(identifier, key));
    return typeof id === 'string' ? id : `{${key}}`;
};

const craft = (identifier, options) => {
    const { hostname = HOSTNAMES.default, protocol = PROTOCOLS.secured } = options || {};
    const rootUrl = `${protocol}://${hostname}`;

    return {
        aPage() {
            return `${rootUrl}/${getAnyId(identifier, 'page')}`;
        },
        aPageAbout() {
            return `${rootUrl}/${getAnyId(identifier, 'page')}${FB_PATH.PAGE__ABOUT}`;
        },
        aPageAsPg() {
            return `${rootUrl}${FB_PATH.PG}/${getAnyId(identifier, 'page')}`;
        },
        aPageAsPageCategory(category) {
            return `${rootUrl}${FB_PATH.PAGES_CATEGORY}/${getCategorySegment(identifier, category)}/${getAnyId(identifier, 'page')}`;
        },
        aPlace() {
            return `${rootUrl}${FB_PATH.PLACES}/${getAnyId(identifier, 'place')}`;
        },
        aPlaceAndCategory(category) {
            return `${rootUrl}${FB_PATH.PLACES}/sometext/${getId(identifier, 'place')}/${getCategoryId(identifier, category)}`;
        },
        aUser() {
            return `${rootUrl}/${getAnyId(identifier, 'user')}`;
        },
    };
};

module.exports = { craft, HOSTNAMES, PROTOCOLS, CATEGORIES: FB_CATEGORIES };
