const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aBiz.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

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
            expect(facebookUrl(url)).toHaveProperty('matches.aBiz', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a biz in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aBiz', false);
        });
    }
});
