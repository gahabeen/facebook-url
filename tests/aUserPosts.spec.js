const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUserPosts);
const invalidUrls = getSamples(
    data.notMatched,
    data.anEvent,
);

describe('Unit > aUserPosts', () => {
    for (const url of validUrls) {
        it(`should detect a user posts page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserPosts);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user posts page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserPosts);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aUserPosts', () => {
    for (const url of validUrls) {
        it(`should detect a user posts page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserPosts', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user posts page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserPosts', false);
        });
    }
});
