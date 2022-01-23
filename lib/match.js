const urlKit = require('./url');
const { mergeDeep } = require('./utils');
const { matchers } = require('./matchers');
const fbid = require('./fbid');

/**
 * @typedef {Object} MatchedIdentity
 * @property {number} id - ID of the matched entity
 * @property {number} slug - Slug of the matched entity
 */

/**
 * @typedef {Object} Matches
 * @property {boolean} aFacebookDomain
 * @property {boolean} aKnownUrl
 * @property {boolean} aPage
 * @property {boolean} aGroup
 * @property {boolean} aPost
 * @property {boolean} aPhoto
 * @property {boolean} aVideo
 * @property {boolean} aPerson
 * @property {boolean} anEvent
 * @property {boolean} aService
 * @property {boolean} aJob
 * @property {boolean} aBusiness
 * @property {boolean} aHashtag
 * @property {boolean} aPlace
 * @property {boolean} aStory
 * @property {boolean} aBiz
 * @property {boolean} aNote
 * @property {boolean} anOffer
 * @property {boolean} aPixel
 * @property {boolean} aPublic
 */

/**
 * @typedef {Object} MatchedState
 * @property {boolean} matched
 * @property {boolean} facebook
 * @property {boolean} known
 * @property {MatchedIdentity} page
 * @property {MatchedIdentity} group
 * @property {MatchedIdentity} post
 * @property {MatchedIdentity} photo
 * @property {MatchedIdentity} video
 * @property {MatchedIdentity} user
 * @property {MatchedIdentity} event
 * @property {MatchedIdentity} service
 * @property {MatchedIdentity} job
 * @property {MatchedIdentity} business
 * @property {MatchedIdentity} hashtag
 * @property {MatchedIdentity} place
 * @property {MatchedIdentity} story
 * @property {MatchedIdentity} biz
 * @property {MatchedIdentity} note
 * @property {MatchedIdentity} offer
 * @property {MatchedIdentity} pixel
 * @property {MatchedIdentity} public
 */

/**
 *
 * @param {*} url
 * @param {*} matcher
 * @returns {MatchedState}
 */
function match(url, matcher) {
    if (typeof matcher.handler !== 'function') {
        throw new Error('Matcher handler must be a function');
    }

    const isFb = (definition) => matchers.find((m) => m.name === 'aFacebookDomain').handler({ definition }).matched;
    const { isId, isIdentifier, identify } = fbid || {};
    const makeNextSegments = (segments) => (segment) => {
        const index = segments.indexOf(segment);
        return index > -1 ? segments.slice(index + 1) : [];
    };

    const path = urlKit.getUrlPath(url);
    const definition = urlKit.getUrlDefinition(url);
    const segments = urlKit.getPathSegments(path);

    let resolved = { matched: false };

    if (isFb(definition)) {
        resolved = matcher.handler({
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

    const allowedKeys = [
        'matched',
        'facebook',
        'known',
        'page',
        'group',
        'post',
        'photo',
        'video',
        'user',
        'event',
        'service',
        'job',
        'business',
        'hashtag',
        'place',
        'story',
        'biz',
        'note',
        'public',
        'offer',
        'pixel',
        'categories',
    ];

    return {
        ...Object.keys(resolved).reduce((filtered, key) => {
            if (allowedKeys.includes(key)) {
                filtered[key] = resolved[key];
            }
            return filtered;
        }, {}),
        //
        '#context': {
            handlerName: matcher.name,
            url,
            path,
            segments,
            definition,
        },
    };
}

function stichResults(state, newState) {
    const { '#context': context, matched, ...restNewState } = newState;
    mergeDeep(
        mergeDeep(
            state,
            {
                matches: {
                    ...(state.matches || {}),
                    ...(context.handlerName ? { [context.handlerName]: matched } : {}),
                },
                matched: matched || state.matched,
            },
        ),
        Object.keys(restNewState).reduce((filtered, key) => {
            if (newState[key] !== undefined) filtered[key] = newState[key];
            return filtered;
        }, {}),
    );

    return state;
}

function makeMatchesLoaders(url, state) {
    const loaders = {};
    state.matches = {};
    for (const matcher of matchers) {
        // initialize state
        state.matches[matcher.name] = undefined;
        // set loader
        loaders[matcher.name] = () => {
            if (state.matches[matcher.name] === undefined) {
                let parent;
                if (matcher.parent && !state.matches[matcher.parent]) {
                    parent = loaders[matcher.parent]();
                }
                if (!parent || parent.matched) {
                    const results = match(url, matcher);
                    stichResults(state, results);
                } else {
                    stichResults(state, { matched: false, '#context': { handlerName: matcher.name } });
                }
            }
        };
    }
    return loaders;
}

function callAllMatchers(loaders) {
    for (const matcher of matchers) {
        loaders[matcher.name](); // call getter to stitch results
    }
}

function callNecessaryMatchers(key, loaders) {
    for (const matcher of matchers) {
        if ((matcher.keys || []).includes(key)) {
            loaders[matcher.name](); // call getter to stitch results
        }
    }
}

module.exports = {
    match,
    callAllMatchers,
    callNecessaryMatchers,
    makeMatchesLoaders,
};
