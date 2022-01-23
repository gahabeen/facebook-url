const { FB_EXPR, FB_PATH } = require('./constants');
const { findCategoriesBySegments } = require('./categories');

const matchIdentifiedResource = (segment, key, options) => {
    let matched = false;
    let resource;

    if (options.path.includes(segment)) {
        const [identifier1, identifier2] = options.nextSegments(segment.slice(1));
        if (options.isId(identifier2) && !options.isId(identifier1)) {
            resource = options.identify(`${identifier1}-${identifier2}`);
            matched = true;
        } else if (options.isIdentifier(identifier1)) {
            resource = options.identify(identifier1);
            if (resource.id || resource.slug) {
                matched = true;
            }
        }
    }

    return { matched, [key]: resource };
};

const mergeMatchesOR = (...matchedResults) => {
    return matchedResults.reduce((state, matchedResult) => {
        return { ...state, ...matchedResult, matched: state.matched || matchedResult.matched };
    }, {});
};

// const mergeMatchesAND = (...matchedResults) => {
//     return matchedResults.reduce((state, matchedResult) => {
//         return { ...state, ...matchedResult, matched: state.matched && matchedResult.matched };
//     }, {});
// };

const pathNotStartingByAnyKnownPath = (path) => (
    Object.values(FB_PATH).every((fbPath) => {
        return !(path.toLowerCase() === fbPath.toLowerCase() || path.toLowerCase().startsWith(`${fbPath.toLowerCase()}/`));
    })
    && Object.values(FB_EXPR).every((fbExp) => {
        return !fbExp.test(path.toLowerCase());
    }));

const pathStartingByAnyKnownPath = (path) => (
    Object.values(FB_PATH).some((fbPath) => {
        return (path.toLowerCase() === fbPath.toLowerCase() || path.toLowerCase().startsWith(`${fbPath.toLowerCase()}/`));
    })
    || Object.values(FB_EXPR).some((fbExp) => {
        return fbExp.test(path.toLowerCase());
    }));

const getMatcher = (name) => matchers.find((m) => m.name === name);
const hasSegment = (segment, segments) => {
    const segmentParts = segment.split('/').filter(Boolean);
    const [segmentPart] = segmentParts;
    const firstPartIndex = segments.findIndex((s) => s.toLowerCase() === segmentPart.toLowerCase());
    if (firstPartIndex > -1) {
        return segmentParts.reduce((acc, part, index) => {
            return acc && segments[firstPartIndex + index].toLowerCase() === part.toLowerCase();
        }, true);
    }
    return false;
};

const makeChildResourceMatcher = (parentName) => (segment, options) => {
    let matched = false;
    const resourceParentMatcher = getMatcher(parentName);
    if (resourceParentMatcher) {
        const resourceParent = resourceParentMatcher.handler(options);
        if (resourceParent.matched && hasSegment(segment, options.segments)) {
            matched = true;
        }
        return { matched };
    }

    // eslint-disable-next-line no-console
    console.warn('No parent resource matcher found for', parentName);
    return {};
};

const matchPageResource = makeChildResourceMatcher('aPage');
const matchUserResource = makeChildResourceMatcher('aUser');

const matchers = [
    {
        name: 'aFacebookDomain',
        keys: ['facebook'],
        handler({ definition }) {
            let matched = false;
            let facebook;
            if (definition.host.split('.').reverse()[1] === 'facebook') {
                matched = true;
                facebook = true;
            }
            return { matched, facebook };
        },
    },
    {
        name: 'aPathWithCategories',
        keys: ['categories'],
        handler({ segments }) {
            let matched = false;
            let categories;

            const foundCategories = findCategoriesBySegments(segments);
            if (foundCategories.length > 0) {
                matched = true;
                categories = foundCategories;
            }

            return { matched, categories };
        },
    },
    {
        name: 'aPageByCategory',
        keys: ['page'],
        handler({ path, segments, identify }) {
            let identifier;
            let page;
            const matched = path.toLowerCase().startsWith(FB_PATH.PAGES_CATEGORY);

            if (matched) {
                [identifier] = segments.slice(3);
                page = identify(identifier);
            }

            return { matched, page };
        },
    },
    {
        name: 'aPageAsPg',
        keys: ['page'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.PG, 'page', options);
        },
    },
    {
        name: 'aGroup',
        keys: ['group'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.GROUPS, 'group', options);
        },
    },
    {
        name: 'aPost',
        keys: ['post'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.POSTS, 'post', options);
        },
    },
    {
        name: 'anEvent',
        keys: ['event'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.EVENTS, 'event', options);
        },
    },
    {
        name: 'aPublic',
        keys: ['public'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.PUBLIC, 'public', options);
        },
    },
    {
        name: 'aHashtag',
        keys: ['hashtag'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.HASHTAG, 'hashtag', options);
        },
    },
    {
        name: 'aJob',
        keys: ['job'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.JOBS_JOB_OPENING, 'job', options);
        },
    },
    {
        name: 'aVideo',
        keys: ['video'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.VIDEOS, 'video', options);
        },
    },
    {
        name: 'aBiz',
        keys: ['biz'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.BIZ, 'biz', options);
        },
    },
    {
        name: 'aStory',
        keys: ['story'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.STORIES, 'story', options);
        },
    },
    {
        name: 'aNote',
        keys: ['note'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.NOTES, 'note', options);
        },
    },
    {
        name: 'aPlace',
        keys: ['place'],
        handler(options) {
            const placeId = options.definition.searchParams.get('place_id');
            if (placeId) {
                return { matched: true, place: options.identify(placeId) };
            }
            return matchIdentifiedResource(FB_PATH.PLACES, 'place', options);
        },
    },
    {
        name: 'anOffer',
        keys: ['offer'],
        handler({ path, definition, identify }) {
            let matched = false;
            let offer;

            const offerId = definition.searchParams.get('fbid');
            if (path.startsWith(FB_PATH.OFFER_DETAILS) && offerId) {
                offer = identify(offerId);
                matched = true;
            }

            return { matched, offer };
        },
    },
    {
        name: 'aBusiness',
        keys: ['business'],
        handler({ path }) {
            let matched = false;
            let business;

            if (path.endsWith(FB_PATH.BUSINESS) || path.includes(`${FB_PATH.BUSINESS}/`)) {
                business = true;
                matched = true;
            }

            return { matched, business };
        },
    },
    {
        name: 'aKnownUrl',
        keys: ['known'],
        handler({ path }) {
            const matched = pathStartingByAnyKnownPath(path);

            let known;

            if (matched) {
                known = true;
            }

            return { matched, known };
        },
    },
    {
        name: 'aUser',
        keys: ['user'],
        handler(options) {
            const { path, segments, isIdentifier, identify } = options;
            let matched = false;
            let user;

            let identifier;

            if (path) {
                const isPeople = hasSegment(FB_PATH.PEOPLE, segments);

                if (isPeople) {
                    return matchIdentifiedResource(FB_PATH.PEOPLE, 'user', options);
                }

                const isPblyUser = pathNotStartingByAnyKnownPath(path);

                if (isPblyUser) {
                    matched = true;
                    [identifier] = segments;
                    if (isIdentifier(identifier)) {
                        user = identify(identifier);
                    }
                }
            }

            return { matched, user };
        },
    },
    {
        name: 'aUserPosts',
        parent: 'aUser',
        handler(options) {
            return matchUserResource(FB_PATH.USER__POSTS, options);
        },
    },
    {
        name: 'aUserAbout',
        handler(options) {
            return mergeMatchesOR(
                matchPageResource(FB_PATH.USER__ABOUT, options),
                matchPageResource(FB_PATH.USER__ABOUT_CONTACT_AND_BASIC_INFO, options),
            );
        },
    },
    { name: 'aUserFriends', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__FRIENDS, options); } },
    { name: 'aUserPhotos', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__PHOTOS, options); } },
    { name: 'aUserVideos', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__VIDEOS, options); } },
    { name: 'aUserSports', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__SPORTS, options); } },
    { name: 'aUserMusic', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__MUSIC, options); } },
    { name: 'aUserTvShows', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__TVSHOWS, options); } },
    { name: 'aUserBooks', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__BOOKS, options); } },
    { name: 'aUserPodcasts', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__PODCATS, options); } },
    { name: 'aUserQuestions', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__QUESTIONS, options); } },
    { name: 'aUserGivenReviews', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__REVIEWS_GIVEN, options); } },
    { name: 'aUserGivenPlaceReviews', parent: 'aUser', handler(options) { return matchUserResource(FB_PATH.USER__REVIEWS_GIVEN, options); } },
    {
        name: 'aPage',
        keys: ['page'],
        handler({ path, segments, isIdentifier, identify }) {
            let matched = false;
            let page;

            let identifier;

            if (path) {
                const isPblyPage = pathNotStartingByAnyKnownPath(path);

                if (isPblyPage) {
                    matched = true;
                    [identifier] = segments;
                    if (isIdentifier(identifier)) {
                        page = identify(identifier);
                    }
                }
            }

            return { matched, page };
        },
    },
    { name: 'aPagePosts', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__POSTS, options); } },
    { name: 'aPageGroups', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__GROUPS, options); } },
    { name: 'aPageJobs', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__JOBS, options); } },
    { name: 'aPageEvents', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__EVENTS, options); } },
    { name: 'aPageReviews', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__REVIEWS, options); } },
    { name: 'aPagePhotos', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__PHOTOS, options); } },
    {
        name: 'aPageAbout',
        parent: 'aPage',
        handler(options) {
            return mergeMatchesOR(
                matchPageResource(FB_PATH.PAGE__ABOUT, options),
                matchPageResource(FB_PATH.PAGE__ABOUT_CONTACT_AND_BASIC_INFO, options),
            );
        },
    },
    { name: 'aPageCommunity', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__COMMUNITY, options); } },
    { name: 'aPageGuides', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__GUIDES, options); } },
    { name: 'aPageOffers', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__OFFERS, options); } },
    { name: 'aPageFundraisers', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__FUNDRAISER, options); } },
    { name: 'aPageServices', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__SERVICES, options); } },
    { name: 'aPageShop', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__SHOP, options); } },
    { name: 'aPageLive', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__LIVE, options); } },
    { name: 'aPageSettings', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__SETTINGS, options); } },
    { name: 'aPagePodcasts', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__PODCASTS, options); } },
    { name: 'aPageInsights', parent: 'aPage', handler(options) { return matchPageResource(FB_PATH.PAGE__INSIGHTS, options); } },
    {
        name: 'aPhoto',
        keys: ['photo'],
        handler({ path, identify, isIdentifier, nextSegments }) {
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
    },
    {
        name: 'aService',
        keys: ['service'],
        handler({ definition, identify, isId }) {
            let matched = false;
            let service;

            const serviceId = definition.searchParams.get('service_id');
            // path.includes(FB_PATH.SERVICES) &&
            if (isId(serviceId)) {
                matched = true;
                service = identify(serviceId);
            }

            return { matched, service };
        },
    },
    {
        name: 'aPixel',
        keys: ['pixel'],
        handler({ path, definition, identify, isId }) {
            let matched = false;
            let pixel;

            const pixelId = definition.searchParams.get('id');
            if (path.startsWith(FB_PATH.TRACKING) && isId(pixelId)) {
                matched = true;
                pixel = identify(pixelId);
            }

            return { matched, pixel };
        },
    },

];

const matchersAsKeyed = matchers.reduce((acc, matcher) => {
    acc[matcher.name] = matcher;
    return acc;
}, {});

module.exports = { matchers, matchersAsKeyed };
