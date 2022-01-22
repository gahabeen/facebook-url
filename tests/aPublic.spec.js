const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPublic);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
    data.aJob, data.aVideo,
);

describe('Unit > aPublic', () => {
    for (const url of validUrls) {
        it(`should detect a public in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPublic);
            expect(result).toHaveProperty('public.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a public in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPublic);
            expect(result).toHaveProperty('public', undefined);
        });
    }
});

describe('Main > aPublic', () => {
    for (const url of validUrls) {
        it(`should detect a public in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPublic', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a public in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPublic', false);
        });
    }
});
