const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPagePosts);
const invalidUrls = getSamples(
    data.notMatched,
);

describe('Unit > aPagePosts', () => {
    for (const url of validUrls) {
        it(`should detect a page posts in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPagePosts);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page posts in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPagePosts);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPagePosts', () => {
    for (const url of validUrls) {
        it(`should detect a page posts in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPagePosts', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page posts in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPagePosts', false);
        });
    }
});
