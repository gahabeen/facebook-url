const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_hashtag.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
    ...require('./data/is_job.json'),
    ...require('./data/is_video.json'),
    ...require('./data/is_public.json'),
];

describe('Unit > isHashtag ', () => {
    for (const url of validUrls) {
        it(`should detect a hashtag in ${url}`, () => {
            const result = match(url, matchers.isHashtag)
            expect(result).toHaveProperty('hashtag.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a hashtag in ${url}`, () => {
            const result = match(url, matchers.isHashtag)
            expect(result).toHaveProperty('hashtag', undefined);
        });
    };
})

describe('Main > isHashtag', () => {
    for (const url of validUrls) {
        it(`should detect a hashtag in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isHashtag', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a hashtag in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isHashtag', false);
        });
    };
})
