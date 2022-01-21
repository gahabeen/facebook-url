const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aFacebookDomain.json');
const invalidUrls = require('./data/not_facebook.json');

describe('Unit > aFacebookDomain', () => {
    for (const url of validUrls) {
        it(`should detect a facebook domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aFacebookDomain)
            expect(result).toHaveProperty('facebook', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a facebook domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aFacebookDomain)
            expect(result).toHaveProperty('facebook', undefined);
        });
    };
})

describe('Main > aFacebookDomain', () => {
    for (const url of validUrls) {
        it(`should detect a facebook domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aFacebookDomain', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a facebook domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aFacebookDomain', false);
        });
    };
})
