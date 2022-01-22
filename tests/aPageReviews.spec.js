const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageReviews);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageReviews', () => {
    for (const url of validUrls) {
        it(`should detect a page reviews in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageReviews);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page reviews in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageReviews);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageReviews', () => {
    for (const url of validUrls) {
        it(`should detect a page reviews in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageReviews', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page reviews in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageReviews', false);
        });
    }
});
