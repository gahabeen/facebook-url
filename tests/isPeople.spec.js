const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_people.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
];

describe('Unit > isPeople', () => {
    for (const url of validUrls) {
        it(`should detect a people in ${url}`, () => {
            const result = match(url, matchers.isPeople)
            expect(result).toHaveProperty('people.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a people in ${url}`, () => {
            const result = match(url, matchers.isPeople)
            expect(result).toHaveProperty('people', undefined);
        });
    };
})

describe('Main > isPeople', () => {
    for (const url of validUrls) {
        it(`should detect a people in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPeople', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a people in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPeople', false);
        });
    };
})
