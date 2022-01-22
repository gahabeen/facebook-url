const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aKnownUrl);
const invalidUrls = getSamples(data.notMatched);

describe('Unit > aKnownUrl', () => {
    for (const url of validUrls) {
        it(`should detect a known domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aKnownUrl);
            expect(result).toHaveProperty('known', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a known domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aKnownUrl);
            expect(result).toHaveProperty('known', undefined);
        });
    }
});

describe('Main > aKnownUrl', () => {
    for (const url of validUrls) {
        it(`should detect a known domain in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aKnownUrl', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a known domain in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aKnownUrl', false);
        });
    }
});
