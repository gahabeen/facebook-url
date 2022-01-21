const { FB_EXPR, FB_PATH } = require('./constants');

const matchIdentifiedResource = (segment, key, options) => {
    let matched = false;
    let resource;

    if (options.path.includes(segment)) {
        const [identifier1, identifier2] = options.nextSegments(segment.slice(1));
        if (options.isId(identifier2) && !options.isId(identifier1)) {
            resource = {
                id: identifier2,
                slug: identifier1
            }
            matched = true;
        } else if (options.isIdentifier(identifier1)) {
            resource = options.identify(identifier1);
            if (resource.id || resource.slug) {
                matched = true;
            }
        }
    }

    return { matched, [key]: resource };
}

const matchers = {
    isFacebook({ definition }) {
        let matched = false;
        let facebook;
        if (definition.host.split('.').reverse()[1] === 'facebook') {
            matched = true
            facebook = true
        }
        return { matched, facebook };
    },
    isPageByCategory({ path, segments, identify }) {
        let identifier;
        let page;
        const matched = path.toLowerCase().startsWith(FB_PATH.PAGES_CATEGORY);

        if (matched) {
            [identifier] = segments.slice(3); // skip 'pages', 'category' and category slug
            page = identify(identifier);
        }

        return { matched, page };
    },
    isPageAsPg(options) {
        return matchIdentifiedResource(FB_PATH.PG, 'page', options);
    },
    isGroup(options) {
        return matchIdentifiedResource(FB_PATH.GROUPS, 'group', options);
    },
    isPost(options) {
        return matchIdentifiedResource(FB_PATH.POSTS, "post", options)
    },
    isEvent(options) {
        return matchIdentifiedResource(FB_PATH.EVENTS, 'event', options);
    },
    isPublic(options) {
        return matchIdentifiedResource(FB_PATH.PUBLIC, 'public', options);
    },
    isHashtag(options) {
        return matchIdentifiedResource(FB_PATH.HASHTAG, 'hashtag', options);
    },
    isPeople: (options) => {
        return matchIdentifiedResource(FB_PATH.PEOPLE, 'people', options);
    },
    isJob: (options) => {
        return matchIdentifiedResource(FB_PATH.JOBS_JOB_OPENING, 'job', options);
    },
    isVideo: (options) => {
        return matchIdentifiedResource(FB_PATH.VIDEOS, 'video', options);
    },
    isBiz: (options) => {
        return matchIdentifiedResource(FB_PATH.BIZ, 'biz', options);
    },
    isStory: (options) => {
        return matchIdentifiedResource(FB_PATH.STORIES, 'story', options);
    },
    isNote: (options) => {
        return matchIdentifiedResource(FB_PATH.NOTES, 'note', options);
    },
    isPlace: (options) => {
        const place_id = options.definition.searchParams.get('place_id')
        if (place_id) {
            return { matched: true, place: options.identify(place_id) }
        } else {
            return matchIdentifiedResource(FB_PATH.PLACES, 'place', options)
        }
    },
    isBusiness({ path }) {
        let matched = false;
        let business;

        if (path.includes(FB_PATH.BUSINESS)) {
            business = true;
            matched = true;
        }

        return { matched, business };
    },
    isKnown({ path }) {
        const matched = (Object.values(FB_PATH).some((fbPath) => path.toLowerCase().startsWith(fbPath))
            || Object.values(FB_EXPR).some((fbExp) => fbExp.test(path.toLowerCase())))

        let known;

        if (matched) {
            known = true;
        }

        return { matched, known }
    },
    isPage: ({ path, segments, definition, isIdentifier, identify }) => {
        const matched = (Object.values(FB_PATH).every((fbPath) => !path.toLowerCase().startsWith(fbPath))
            && Object.values(FB_EXPR).every((fbExp) => !fbExp.test(path.toLowerCase())))
        let page;

        let identifier;

        if (path) {
            if (matched) {
                [identifier] = segments; // skip 'pages', 'category' and category slug
                if (isIdentifier(identifier)) {
                    page = identify(identifier);
                }
            }
        }

        return { matched, page };
    },
    isPhoto: ({ path, identify, isIdentifier, nextSegments }) => {
        let matched = false;
        let photo;

        if (path.includes(FB_PATH.PHOTOS)) {
            const [identifier1, identifier2] = nextSegments(FB_PATH.PHOTOS.slice(1));
            if (isIdentifier(identifier1) || isIdentifier(identifier2)) {
                photo = identify(identifier1);
                if (!photo.id) photo = identify(identifier2);
                matched = true;
            }
        }

        return { matched, photo };
    },
    isService: ({ path, definition, identify, isId }) => {
        let matched = false;
        let service;

        const service_id = definition.searchParams.get('service_id')
        // path.includes(FB_PATH.SERVICES) &&
        if (isId(service_id)) {
            matched = true
            service = identify(service_id);
        }

        return { matched, service };
    },
};

module.exports = matchers;
