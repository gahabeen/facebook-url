const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_known.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
];


describe('Unit > isKnown ', () => {
    for (const url of validUrls) {
        it(`should detect a known domain in ${url}`, () => {
            const result = match(url, matchers.isKnown)
            expect(result).toHaveProperty('known', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a known domain in ${url}`, () => {
            const result = match(url, matchers.isKnown)
            expect(result).toHaveProperty('known', undefined);
        });
    };
})

describe('Main > isKnown', () => {
    for (const url of validUrls) {
        it(`should detect a known domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isKnown', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a known domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isKnown', false);
        });
    };
})
