const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aKnownUrl.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
];

describe('Unit > aKnownUrl', () => {
    for (const url of validUrls) {
        it(`should detect a known domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aKnownUrl);
            expect(result).toHaveProperty('known', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a known domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aKnownUrl);
            expect(result).toHaveProperty('known', undefined);
        });
    }
});

describe('Main > aKnownUrl', () => {
    for (const url of validUrls) {
        it(`should detect a known domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aKnownUrl', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a known domain in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aKnownUrl', false);
        });
    }
});
