const urlKit = require('./url');
const { matchers, matchersAsKeyed } = require('./matchers');

/**
 * @typedef {Object} MatchedIdentity
 * @property {number} id - ID of the matched entity
 * @property {number} slug - Slug of the matched entity
 */

/**
 * @typedef {Object} MatchedAllMatches
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
 * @typedef {Object} MatchedResult
 * @property {boolean} matched
 * @property {boolean} facebook
 * @property {boolean} known
 * @property {MatchedIdentity} page
 * @property {MatchedIdentity} group
 * @property {MatchedIdentity} post
 * @property {MatchedIdentity} photo
 * @property {MatchedIdentity} video
 * @property {MatchedIdentity} person
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
 * @typedef {Object} MatchedAllResult
 * @property {boolean} matched
 * @property {boolean} facebook
 * @property {boolean} known
 * @property {MatchedIdentity} page
 * @property {MatchedIdentity} group
 * @property {MatchedIdentity} post
 * @property {MatchedIdentity} photo
 * @property {MatchedIdentity} video
 * @property {MatchedIdentity} person
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
 * @property {MatchedAllMatches} matches
 */

/**
 *
 * @param {*} url
 * @param {*} matcher
 * @returns {MatchedResult}
 */
function match(url, matcher) {
    if (typeof matcher.handler !== 'function') {
        throw new Error('Matcher handler must be a function');
    }

    const isFb = (definition) => matchers.find((m) => m.name === 'aFacebookDomain').handler({ definition }).matched;
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
        'person',
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
    Object.assign(
        state,
        {
            matches: {
                ...(state.matches || {}),
                ...(newState['#context'].handlerName ? { [newState['#context'].handlerName]: newState.matched } : {}),
            },
        },
        Object.keys(newState).reduce((filtered, key) => {
            if (newState[key] !== undefined && !['#context'].includes(key)) filtered[key] = newState[key];
            return filtered;
        }, {}),
    );

    return state;
}

function makeMatchesLoaders(url, state) {
    const loaders = {};
    for (const matcher of matchers) {
        loaders[matcher.name] = () => {
            if (!(matcher.name in (state.matches || {}))) {
                const results = match(url, matcher);
                stichResults(state, results);
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
