const { FB_EXPR, FB_PATH } = require('./constants');

const matchIdentifiedResource = (segment, key, options) => {
    let matched = false;
    let resource;

    if (options.path.includes(segment)) {
        const [identifier1, identifier2] = options.nextSegments(segment.slice(1));
        if (options.isId(identifier2) && !options.isId(identifier1)) {
            resource = {
                id: identifier2,
                slug: identifier1,
            };
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

const matchPageResource = (segment, options) => {
    let matched = false;
    const page = matchers.find((m) => m.name === 'aPage').handler(options);
    if (page.matched && options.path.includes(segment)) {
        matched = true;
    }
    return { matched };
};

const matchUserResource = (segment, options) => {
    let matched = false;
    const user = matchers.find((m) => m.name === 'aUser').handler(options);
    if (user.matched && options.path.includes(segment)) {
        matched = true;
    }
    return { matched };
};

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
        name: 'aHashtagSearch',
        keys: ['hashtag'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.HASHTAG, 'hashtag', options);
        },
    },
    {
        name: 'aPerson',
        keys: ['person'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.PEOPLE, 'person', options);
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
            const matched = (Object.values(FB_PATH).some((fbPath) => path.toLowerCase().startsWith(fbPath))
                || Object.values(FB_EXPR).some((fbExp) => fbExp.test(path.toLowerCase())));

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
        handler({ path, segments, isIdentifier, identify }) {
            const matched = (Object.values(FB_PATH).every((fbPath) => !path.toLowerCase().startsWith(fbPath))
                && Object.values(FB_EXPR).every((fbExp) => !fbExp.test(path.toLowerCase())));
            let user;

            let identifier;

            if (path) {
                if (matched) {
                    [identifier] = segments;
                    if (isIdentifier(identifier)) {
                        user = identify(identifier);
                    }
                }
            }

            return { matched, user };
        },
    },
    { name: 'aUserPosts', handler(options) { return matchUserResource(FB_PATH.USER__POSTS, options); } },
    { name: 'aUserAbout', handler(options) { return matchUserResource(FB_PATH.USER__ABOUT, options); } },
    { name: 'aUserFriends', handler(options) { return matchUserResource(FB_PATH.USER__FRIENDS, options); } },
    { name: 'aUserPhotos', handler(options) { return matchUserResource(FB_PATH.USER__PHOTOS, options); } },
    { name: 'aUserVideos', handler(options) { return matchUserResource(FB_PATH.USER__VIDEOS, options); } },
    { name: 'aUserSports', handler(options) { return matchUserResource(FB_PATH.USER__SPORTS, options); } },
    { name: 'aUserMusic', handler(options) { return matchUserResource(FB_PATH.USER__MUSIC, options); } },
    { name: 'aUserTvShows', handler(options) { return matchUserResource(FB_PATH.USER__TVSHOWS, options); } },
    { name: 'aUserBooks', handler(options) { return matchUserResource(FB_PATH.USER__BOOKS, options); } },
    { name: 'aUserPodcasts', handler(options) { return matchUserResource(FB_PATH.USER__PODCATS, options); } },
    { name: 'aUserQuestions', handler(options) { return matchUserResource(FB_PATH.USER__QUESTIONS, options); } },
    { name: 'aUserGivenReviews', handler(options) { return matchUserResource(FB_PATH.USER__REVIEWS_GIVEN, options); } },
    { name: 'aUserGivenPlaceReviews', handler(options) { return matchUserResource(FB_PATH.USER__REVIEWS_GIVEN, options); } },
    {
        name: 'aPage',
        keys: ['page'],
        handler({ path, segments, isIdentifier, identify }) {
            const matched = (Object.values(FB_PATH).every((fbPath) => !path.toLowerCase().startsWith(fbPath))
                && Object.values(FB_EXPR).every((fbExp) => !fbExp.test(path.toLowerCase())));
            let page;

            let identifier;

            if (path) {
                if (matched) {
                    [identifier] = segments;
                    if (isIdentifier(identifier)) {
                        page = identify(identifier);
                    }
                }
            }

            return { matched, page };
        },
    },
    { name: 'aPagePosts', handler(options) { return matchPageResource(FB_PATH.PAGE__POSTS, options); } },
    { name: 'aPageGroups', handler(options) { return matchPageResource(FB_PATH.PAGE__GROUPS, options); } },
    { name: 'aPageJobs', handler(options) { return matchPageResource(FB_PATH.PAGE__JOBS, options); } },
    { name: 'aPageEvents', handler(options) { return matchPageResource(FB_PATH.PAGE__EVENTS, options); } },
    { name: 'aPageReviews', handler(options) { return matchPageResource(FB_PATH.PAGE__REVIEWS, options); } },
    { name: 'aPagePhotos', handler(options) { return matchPageResource(FB_PATH.PAGE__PHOTOS, options); } },
    { name: 'aPageAbout', handler(options) { return matchPageResource(FB_PATH.PAGE__ABOUT, options); } },
    { name: 'aPageCommunity', handler(options) { return matchPageResource(FB_PATH.PAGE__COMMUNITY, options); } },
    { name: 'aPageGuides', handler(options) { return matchPageResource(FB_PATH.PAGE__GUIDES, options); } },
    { name: 'aPageOffers', handler(options) { return matchPageResource(FB_PATH.PAGE__OFFERS, options); } },
    { name: 'aPageFundraiser', handler(options) { return matchPageResource(FB_PATH.PAGE__FUNDRAISER, options); } },
    { name: 'aPageServices', handler(options) { return matchPageResource(FB_PATH.PAGE__SERVICES, options); } },
    { name: 'aPageShop', handler(options) { return matchPageResource(FB_PATH.PAGE__SHOP, options); } },
    { name: 'aPageLive', handler(options) { return matchPageResource(FB_PATH.PAGE__LIVE, options); } },
    { name: 'aPageSettings', handler(options) { return matchPageResource(FB_PATH.PAGE__SETTINGS, options); } },
    { name: 'aPagePodcasts', handler(options) { return matchPageResource(FB_PATH.PAGE__PODCASTS, options); } },
    { name: 'aPageInsights', handler(options) { return matchPageResource(FB_PATH.PAGE__INSIGHTS, options); } },
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
