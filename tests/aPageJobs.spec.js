const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPagePhotos);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPagePhotos', () => {
    for (const url of validUrls) {
        it(`should detect a page photo in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPagePhotos);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page photo in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPagePhotos);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPagePhotos', () => {
    for (const url of validUrls) {
        it(`should detect a page photo in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPagePhotos', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page photo in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPagePhotos', false);
        });
    }
});
