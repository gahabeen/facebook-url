const urlKit = require('./url');
const matchers = require('./matchers')

function match(url, handler) {
    if (typeof handler !== 'function') {
        throw new Error('Matcher handler must be a function');
    }

    const isFb = (definition) => matchers.isFacebook({ definition }).matched;
    const isId = (str) => /^\d+$/.test(str || '');
    const isIdentifier = (str) => str && (isId(str) || str.length > 3);
    const makeNextSegments = (segments) => (segment) => {
        const index = segments.indexOf(segment);
        return segments.slice(index + 1);
    };

    const identify = (identifier) => {
        let id;
        let slug;

        if (isIdentifier(identifier)) {
            const parts = (identifier || '').trim().split('-');
            const potentialId = ([...parts].reverse()[0] || '').trim();
            if (isId(potentialId)) {
                id = potentialId;
                slug = parts.slice(0, -1).join('-');
            } else {
                slug = identifier;
            }
        }

        return { id, slug, identifier };
    };

    const path = urlKit.getUrlPath(url);
    const definition = urlKit.getUrlDefinition(url);
    const segments = urlKit.getPathSegments(path);

    let resolved = { matched: false }

    if (isFb(definition)) {

        resolved = handler({
            url,
            path,
            definition,
            segments,
            isId,
            isIdentifier,
            identify,
            nextSegments: makeNextSegments(segments),
        });

    }

    const {
        matched,
        facebook,
        known,
        page,
        group,
        post,
        photo,
        video,
        people,
        event,
        service,
        job,
        business,
        hashtag,
        place,
        biz,
        public: publicPage,
    } = resolved;

    return {
        matched,
        //
        facebook,
        known,
        page,
        group,
        post,
        photo,
        video,
        people,
        event,
        service,
        job,
        business,
        hashtag,
        place,
        biz,
        public: publicPage,
        //
        '#context': {
            test: handler.name,
            url,
            path,
            segments,
            definition,
        },
    };

}

function matchAll(url) {
    return Object.values(matchers).reduce((acc, matcher) => {
        const { '#context': context, ...data } = match(url, matcher);
        const updated = { ...acc, matches: { ...(acc.matches || {}), ...(context.test ? { [context.test]: data.matched } : {}) } };
        if (!data.matched) return updated;

        return {
            ...updated,
            ...Object.keys(data).reduce((filtered, key) => {
                if (data[key] !== undefined) filtered[key] = data[key];
                return filtered;
            }, {}),
        };
    }, { url });
}

// console.log(match("https://www.facebook.com/places/Landscape-Company-in-Green-Cove-Springs-Florida/109718635720335/128853933850116/", matchers.isKnown));

module.exports = {
    matchers,
    match,
    matchAll,
};
