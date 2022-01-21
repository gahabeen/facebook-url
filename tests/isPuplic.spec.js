const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_public.json');
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
];

describe('Unit > isPublic ', () => {
    for (const url of validUrls) {
        it(`should detect a public in ${url}`, () => {
            const result = match(url, matchers.isPublic)
            expect(result).toHaveProperty('public.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a public in ${url}`, () => {
            const result = match(url, matchers.isPublic)
            expect(result).toHaveProperty('public', undefined);
        });
    };
})

describe('Main > isPublic', () => {
    for (const url of validUrls) {
        it(`should detect a public in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPublic', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a public in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isPublic', false);
        });
    };
})
