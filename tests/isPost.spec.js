const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_post.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_page_by_category.json'),
]

describe('Unit > isPost ', () => {
    for (const url of validUrls) {
        it(`should detect a post in ${url}`, () => {
            const result = match(url, matchers.isPost)
            expect(result).toHaveProperty('post.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a post in ${url}`, () => {
            const result = match(url, matchers.isPost)
            expect(result).toHaveProperty('post', undefined);
        });
    };
})

describe('Main > isPost', () => {
    for (const url of validUrls) {
        it(`should detect a post in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPost', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a post in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPost', false);
        });
    };
})
