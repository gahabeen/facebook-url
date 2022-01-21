const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPlace.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

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
            expect(facebookUrl(url)).toHaveProperty('matches.aPlace', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a place in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPlace', false);
        });
    }
});
