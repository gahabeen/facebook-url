const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aGroup);
const invalidUrls = getSamples(data.notMatched, data.aPage, data.aPageAsPg, data.aPageByCategory);

describe('Unit > aGroup', () => {
    for (const url of validUrls) {
        it(`should detect a group in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aGroup);
            expect(result).toHaveProperty('group.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a group in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aGroup);
            expect(result).toHaveProperty('group', undefined);
        });
    }
});

describe('Main > aGroup', () => {
    for (const url of validUrls) {
        it(`should detect a group in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aGroup', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a group in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aGroup', false);
        });
    }
});
