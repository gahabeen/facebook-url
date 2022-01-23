const { makeMatchesLoaders, callNecessaryMatchers, callAllMatchers } = require('./match');

/**
 * @typedef {Object} ParseResult
 * @property {Matches} matches
 * @property {MatchedState} state
 * @property {MatchedState} all
 */

/**
 *
 * @param {*} url
 * @returns {ParseResult}
 */
function parse(url, { lazy = false } = {}) {
    let loaded = false;
    // eslint-disable-next-line prefer-const
    let state = {}; // will be updated by stitcher
    const loaders = makeMatchesLoaders(url, state);
    if (!lazy) {
        callAllMatchers(loaders);
        loaded = true;
    }

    return new Proxy({}, {
        get(_, key) {
            if (['#parsed'].includes(key)) return true;
            if (['#lazy'].includes(key)) return lazy;
            if (['#loaded'].includes(key)) return loaded;

            if (['url'].includes(key)) return url;

            if (['matches', 'is'].includes(key)) {
                return new Proxy(state.matches, {
                    get(__, skey) {
                        if (skey in loaders) {
                            loaders[skey](); // call getter to stitch results
                            return state.matches[skey];
                        }
                    },
                });
            }

            if (['state', 'data'].includes(key)) {
                const { matches: ___, ...restState } = state;
                return new Proxy(restState, {
                    get(__, skey) {
                        if (skey !== 'matches') {
                            callNecessaryMatchers(skey, loaders);
                            return state[skey];
                        }
                    },
                });
            }

            if (['load'].includes(key)) {
                return () => {
                    if (!loaded) {
                        callAllMatchers(loaders);
                    }
                    return state;
                };
            }
        },
    });
}

module.exports = { parse };
