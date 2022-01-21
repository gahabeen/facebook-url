const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_story.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
];

describe('Unit > isStory ', () => {
    for (const url of validUrls) {
        it(`should detect a story in ${url}`, () => {
            const result = match(url, matchers.isStory)
            expect(result).toHaveProperty('story.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a story in ${url}`, () => {
            const result = match(url, matchers.isStory)
            expect(result).toHaveProperty('story', undefined);
        });
    };
})

describe('Main > isStory', () => {
    for (const url of validUrls) {
        it(`should detect a story in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isStory', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a story in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isStory', false);
        });
    };
})
