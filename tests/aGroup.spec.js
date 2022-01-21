const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aGroup.json');
const invalidUrls = [...require('./data/not_facebook.json'), ...require('./data/aPage.json')];

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
            expect(facebookUrl(url)).toHaveProperty('matches.aGroup', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a group in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aGroup', false);
        });
    }
});
