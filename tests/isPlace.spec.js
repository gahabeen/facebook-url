const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_place.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
];

describe('Unit > isPlace ', () => {
    for (const url of validUrls) {
        it(`should detect a place in ${url}`, () => {
            const result = match(url, matchers.isPlace)
            expect(result).toHaveProperty('place.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a place in ${url}`, () => {
            const result = match(url, matchers.isPlace)
            expect(result).toHaveProperty('place', undefined);
        });
    };
})

describe('Main > isPlace', () => {
    for (const url of validUrls) {
        it(`should detect a place in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPlace', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a place in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPlace', false);
        });
    };
})
