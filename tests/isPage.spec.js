const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_page.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_page_by_category.json'),
    ...require('./data/is_group.json')];

describe('Unit > isPage ', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchers.isPage)
            expect(result).toHaveProperty('page.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchers.isPage)
            expect(result).toHaveProperty('page', undefined);
        });
    };
})

describe('Main > isPage', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPage', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPage', false);
        });
    };
})
