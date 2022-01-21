const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPage.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPageByCategory.json'),
    ...require('./data/aGroup.json')];

describe('Unit > aPage', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPage);
            expect(result).toHaveProperty('page.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPage);
            expect(result).toHaveProperty('page', undefined);
        });
    }
});

describe('Main > aPage', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPage', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPage', false);
        });
    }
});
