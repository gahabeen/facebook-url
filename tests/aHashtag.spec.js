const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aHashtag);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
    data.aJob, data.aVideo, data.aPublic,
);

describe('Unit > aHashtag', () => {
    for (const url of validUrls) {
        it(`should detect a hashtag in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aHashtag);
            expect(result).toHaveProperty('hashtag.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a hashtag in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aHashtag);
            expect(result).toHaveProperty('hashtag', undefined);
        });
    }
});

describe('Main > aHashtag', () => {
    for (const url of validUrls) {
        it(`should detect a hashtag in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aHashtag', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a hashtag in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aHashtag', false);
        });
    }
});
