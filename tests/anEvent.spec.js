const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/anEvent.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
];

describe('Unit > anEvent', () => {
    for (const url of validUrls) {
        it(`should detect a event in ${url}`, () => {
            const result = match(url, matchersAsKeyed.anEvent);
            expect(result).toHaveProperty('event.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a event in ${url}`, () => {
            const result = match(url, matchersAsKeyed.anEvent);
            expect(result).toHaveProperty('event', undefined);
        });
    }
});

describe('Main > anEvent', () => {
    for (const url of validUrls) {
        it(`should detect a event in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.anEvent', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a event in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.anEvent', false);
        });
    }
});
