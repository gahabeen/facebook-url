const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aBiz);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.aGroup,
    data.anEvent,
    data.aPage,
    data.aPageAsPg,
    data.aPageByCategory,
);

describe('Unit > aBiz', () => {
    for (const url of validUrls) {
        it(`should detect a biz in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aBiz);
            expect(result).toHaveProperty('biz.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a biz in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aBiz);
            expect(result).toHaveProperty('biz', undefined);
        });
    }
});

describe('Main > aBiz', () => {
    for (const url of validUrls) {
        it(`should detect a biz in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aBiz', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a biz in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aBiz', false);
        });
    }
});
