const { FB_EXPR, FB_PATH } = require('./constants');
const utils = require('./utils');
const { findCategoriesBySegments, findDomainByHostname, findLanguage } = require('./datasets');

const hasSegment = (segment, segments) => {
    const segmentParts = segment.split('/').filter(Boolean);
    const [segmentPart] = segmentParts;
    const firstPartIndex = segments.findIndex((s) => s.toLowerCase() === segmentPart.toLowerCase());
    if (firstPartIndex > -1) {
        return segmentParts.reduce((acc, part, index) => {
            return acc && segments[firstPartIndex + index] && segments[firstPartIndex + index].toLowerCase() === part.toLowerCase();
        }, true);
    }
    return false;
};

const matchIdentifiedResource = (segment, key, options) => {
    let matched = false;
    let resource;
    if (hasSegment(segment, options.segments)) {
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

const isPathNotStartingByAnyKnownPath = (path) => (
    Object.values(FB_PATH).every((fbPath) => {
        const cleanPath = utils.removeTrailingSlashes(path);
        const cleanfbPath = utils.removeTrailingSlashes(fbPath);
        return !(
            cleanPath.toLowerCase() === cleanfbPath.toLowerCase()
            || cleanPath.toLowerCase().startsWith(`${cleanfbPath.toLowerCase()}/`)
        );
    })
    && Object.values(FB_EXPR).every((fbExp) => {
        return !fbExp.test(path.toLowerCase());
    }));

const keyedPathsStartingByAnyKnownPath = (path) => Object.fromEntries([
    // eslint-disable-next-line no-unused-vars
    ...Object.entries(FB_PATH).filter(([_, fbPath]) => {
        const cleanPath = utils.removeTrailingSlashes(path);
        const cleanfbPath = utils.removeTrailingSlashes(fbPath);
        return (
            cleanPath.toLowerCase() === cleanfbPath.toLowerCase()
            || cleanPath.toLowerCase().startsWith(`${cleanfbPath.toLowerCase()}/`)
            || cleanPath.toLowerCase().endsWith(`/${cleanfbPath.toLowerCase()}`)
        );
    }),
    // eslint-disable-next-line no-unused-vars
    ...Object.entries(FB_EXPR).filter(([_, fbExp]) => fbExp.test(path.toLowerCase())),
]);

const getMatcher = (name) => matchers.find((m) => m.name === name);

const makeChildResourceMatcher = (parentsName) => (segment, options) => {
    let matched = false;
    const resourceParentMatcher = getMatcher(parentsName);
    if (resourceParentMatcher) {
        const resourceParent = resourceParentMatcher.handler(options);
        if (resourceParent.matched && hasSegment(segment, options.segments)) {
            matched = true;
        }
        return { matched };
    }

    // eslint-disable-next-line no-console
    console.warn('No parents resource matcher found for', parentsName);
    return {};
};

const matchPageResource = makeChildResourceMatcher('aPage');
const matchUserResource = makeChildResourceMatcher('aUser');

const matchers = [
    {
        name: 'aFacebookDomain',
        keys: ['url', 'domain', 'language'],
        handler({ definition }) {
            let matched = false;
            let domain;
            let language;
            let url;
            const foundDomain = findDomainByHostname(definition.hostname);

            if (foundDomain) {
                matched = true;
                domain = foundDomain;
                url = definition;
                language = findLanguage(foundDomain.language || 'en');
            }

            return { matched, url, domain, language };
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
        name: 'aPageAsPages',
        keys: ['page'],
        handler(options) {
            if (options.path.startsWith(FB_PATH.PAGES) && !options.path.startsWith(FB_PATH.PAGES_CATEGORY)) {
                return matchIdentifiedResource(FB_PATH.PAGES, 'page', options);
            }
            return { matched: false };
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
            const postId = options.definition.searchParams.get('post_id');
            if (postId) {
                return { matched: true, post: options.identify(postId) };
            }
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
        keys: ['story', 'page', 'user'],
        handler(options) {
            let page;
            let user;
            const storyId = options.definition.searchParams.get('story_fbid');
            if (storyId) {
                const id = options.definition.searchParams.get('id');
                if (id) {
                    page = options.identify(id);
                    user = options.identify(id);
                }

                return { matched: true, story: options.identify(storyId), page, user };
            }
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
        keys: ['paths'],
        handler({ path }) {
            let matched;
            let paths = keyedPathsStartingByAnyKnownPath(path);

            if (Object.keys(paths).length > 0) {
                matched = true;
            } else {
                paths = undefined;
            }

            return { matched, paths };
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

            if (utils.removeTrailingSlashes(path).length > 0) {
                const isPblyUser = isPathNotStartingByAnyKnownPath(path);

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
        name: 'aUserAsPeople',
        keys: ['user'],
        handler(options) {
            return matchIdentifiedResource(FB_PATH.PEOPLE, 'user', options);
        },
    },
    {
        name: 'aUserPosts',
        parents: ['aUser'],
        handler(options) {
            return matchUserResource(FB_PATH.USER__POSTS, options);
        },
    },
    {
        name: 'aUserAbout',
        parents: ['aUser'],
        handler(options) {
            return mergeMatchesOR(
                matchPageResource(FB_PATH.USER__ABOUT, options),
                matchPageResource(FB_PATH.USER__ABOUT_CONTACT_AND_BASIC_INFO, options),
            );
        },
    },
    { name: 'aUserFriends', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__FRIENDS, options); } },
    { name: 'aUserPhotos', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__PHOTOS, options); } },
    { name: 'aUserVideos', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__VIDEOS, options); } },
    { name: 'aUserSports', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__SPORTS, options); } },
    { name: 'aUserMusic', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__MUSIC, options); } },
    { name: 'aUserTvShows', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__TVSHOWS, options); } },
    { name: 'aUserBooks', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__BOOKS, options); } },
    { name: 'aUserPodcasts', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__PODCATS, options); } },
    { name: 'aUserQuestions', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__QUESTIONS, options); } },
    { name: 'aUserGivenReviews', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__REVIEWS_GIVEN, options); } },
    { name: 'aUserGivenPlaceReviews', parents: ['aUser'], handler(options) { return matchUserResource(FB_PATH.USER__REVIEWS_GIVEN, options); } },
    {
        name: 'aPage',
        keys: ['page'],
        handler({ path, segments, definition, isIdentifier, identify }) {
            let matched = false;
            let page;

            const pageId = definition.searchParams.get('page_id');
            if (pageId) {
                return { matched: true, page: identify(pageId) };
            }

            if (utils.removeTrailingSlashes(path).length > 0) {
                const isPblyPage = isPathNotStartingByAnyKnownPath(path);

                if (isPblyPage) {
                    matched = true;
                    const [identifier] = segments;
                    if (isIdentifier(identifier)) {
                        page = identify(identifier);
                    }
                }
            }

            return { matched, page };
        },
    },
    { name: 'aPagePosts', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__POSTS, options); } },
    { name: 'aPageGroups', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__GROUPS, options); } },
    { name: 'aPageJobs', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__JOBS, options); } },
    { name: 'aPageEvents', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__EVENTS, options); } },
    { name: 'aPageReviews', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__REVIEWS, options); } },
    { name: 'aPagePhotos', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__PHOTOS, options); } },
    {
        name: 'aPageAbout',
        parents: ['aPage'],
        handler(options) {
            return mergeMatchesOR(
                matchPageResource(FB_PATH.PAGE__ABOUT, options),
                matchPageResource(FB_PATH.PAGE__ABOUT_CONTACT_AND_BASIC_INFO, options),
            );
        },
    },
    { name: 'aPageCommunity', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__COMMUNITY, options); } },
    { name: 'aPageGuides', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__GUIDES, options); } },
    { name: 'aPageOffers', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__OFFERS, options); } },
    { name: 'aPageFundraisers', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__FUNDRAISER, options); } },
    { name: 'aPageServices', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__SERVICES, options); } },
    { name: 'aPageShop', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__SHOP, options); } },
    { name: 'aPageLive', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__LIVE, options); } },
    { name: 'aPageSettings', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__SETTINGS, options); } },
    { name: 'aPagePodcasts', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__PODCASTS, options); } },
    { name: 'aPageInsights', parents: ['aPage'], handler(options) { return matchPageResource(FB_PATH.PAGE__INSIGHTS, options); } },
    {
        name: 'aPhoto',
        keys: ['photo'],
        handler({ path, identify, isIdentifier, nextSegments }) {
            let matched = false;
            let photo;

            if (path.includes(FB_PATH.PHOTOS)) {
                const [fakeIdentifier, identifier1] = nextSegments(FB_PATH.PHOTOS.slice(1));
                if (isIdentifier(identifier1) || isIdentifier(fakeIdentifier)) {
                    photo = identify(identifier1);
                    if (!photo.id) photo = identify(fakeIdentifier);
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
            if (path.endsWith(FB_PATH.TRACKING) && isId(pixelId)) {
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
