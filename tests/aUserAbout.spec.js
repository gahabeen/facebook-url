const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/main');
const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUserAbout);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aUserAbout', () => {
    for (const url of validUrls) {
        it(`should detect a user about page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserAbout);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user about page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserAbout);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aUserAbout', () => {
    for (const url of validUrls) {
        it(`should detect a user about page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserAbout', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user about page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserAbout', false);
        });
    }
});
