const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageByCategory);
const invalidUrls = getSamples(data.notMatched, data.aPage, data.aGroup);

describe('Unit > aPageByCategory', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageByCategory);
            expect(result).toHaveProperty('page.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageByCategory);
            expect(result).toHaveProperty('page', undefined);
        });
    }
});

describe('Main > aPageByCategory', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageByCategory', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageByCategory', false);
        });
    }
});
