const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_page_by_category.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_group.json')];

describe('Unit > isPageByCategory ', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchers.isPageByCategory)
            expect(result).toHaveProperty('page.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchers.isPageByCategory)
            expect(result).toHaveProperty('page', undefined);
        });
    };
})

describe('Main > isPageByCategory', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPageByCategory', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPageByCategory', false);
        });
    };
})
