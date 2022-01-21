const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_facebook.json');
const invalidUrls = require('./data/is_not_facebook.json');

describe('Unit > isFacebook ', () => {
    for (const url of validUrls) {
        it(`should detect a facebook domain in ${url}`, () => {
            const result = match(url, matchers.isFacebook)
            expect(result).toHaveProperty('facebook', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a facebook domain in ${url}`, () => {
            const result = match(url, matchers.isFacebook)
            expect(result).toHaveProperty('facebook', undefined);
        });
    };
})

describe('Main > isFacebook', () => {
    for (const url of validUrls) {
        it(`should detect a facebook domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isFacebook', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a facebook domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isFacebook', false);
        });
    };
})
