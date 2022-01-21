const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_biz.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
];

describe('Unit > isBiz ', () => {
    for (const url of validUrls) {
        it(`should detect a biz in ${url}`, () => {
            const result = match(url, matchers.isBiz)
            expect(result).toHaveProperty('biz.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a biz in ${url}`, () => {
            const result = match(url, matchers.isBiz)
            expect(result).toHaveProperty('biz', undefined);
        });
    };
})

describe('Main > isBiz', () => {
    for (const url of validUrls) {
        it(`should detect a biz in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isBiz', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a biz in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isBiz', false);
        });
    };
})
