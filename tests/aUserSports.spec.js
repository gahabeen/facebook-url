const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUserSports);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aUserSports', () => {
    for (const url of validUrls) {
        it(`should detect a user sports page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserSports);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user sports page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserSports);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aUserSports', () => {
    for (const url of validUrls) {
        it(`should detect a user sports page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserSports', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user sports page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserSports', false);
        });
    }
});
