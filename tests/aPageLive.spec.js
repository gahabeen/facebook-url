const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageLive);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aPageLive', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageLive);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageLive);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageLive', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageLive', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageLive', false);
        });
    }
});
