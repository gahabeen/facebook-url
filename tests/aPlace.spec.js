const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPlace);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
);

describe('Unit > aPlace', () => {
    for (const url of validUrls) {
        it(`should detect a place in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPlace);
            expect(result).toHaveProperty('place.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a place in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPlace);
            expect(result).toHaveProperty('place', undefined);
        });
    }
});

describe('Main > aPlace', () => {
    for (const url of validUrls) {
        it(`should detect a place in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPlace', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a place in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPlace', false);
        });
    }
});
