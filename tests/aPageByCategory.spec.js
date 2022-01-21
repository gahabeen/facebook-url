const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPageByCategory.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aGroup.json')];

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
            expect(facebookUrl(url)).toHaveProperty('matches.aPageByCategory', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPageByCategory', false);
        });
    }
});
