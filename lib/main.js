const { makeMatchesLoaders, callNecessaryMatchers, callAllMatchers } = require('./match');

function facebookUrl(url) {
    // eslint-disable-next-line prefer-const
    let state = {}; // will be updated by stitcher
    const loaders = makeMatchesLoaders(url, state);

    return new Proxy({}, {
        get(_, key) {
            if (key === 'matches') {
                return new Proxy({}, {
                    get(__, skey) {
                        if (skey in loaders) {
                            loaders[skey](); // call getter to stitch results
                            return state.matches[skey];
                        }
                    },
                });
            }

            if (key === 'state') {
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

            if (key === 'all') {
                callAllMatchers(loaders);
                return state;
            }
        },
    });
}

// const fbUrl = facebookUrl('https://www.facebook.com/groups/1234/');

// console.log(fbUrl.matches.aGroup);
// console.log(fbUrl.read);
// console.log(fbUrl.all);

module.exports = facebookUrl;
