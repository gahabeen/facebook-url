const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_page_as_pg.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_page_by_category.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_page.json'),
];

describe('Unit > isPageAsPg ', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchers.isPageAsPg)
            expect(result).toHaveProperty('page.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchers.isPageAsPg)
            expect(result).toHaveProperty('page', undefined);
        });
    };
})

describe('Main > isPageAsPg', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPageAsPg', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPageAsPg', false);
        });
    };
})
