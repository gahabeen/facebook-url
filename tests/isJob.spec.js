const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_job.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
];

describe('Unit > isJob ', () => {
    for (const url of validUrls) {
        it(`should detect a job in ${url}`, () => {
            const result = match(url, matchers.isJob)
            expect(result).toHaveProperty('job.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a job in ${url}`, () => {
            const result = match(url, matchers.isJob)
            expect(result).toHaveProperty('job', undefined);
        });
    };
})

describe('Main > isJob', () => {
    for (const url of validUrls) {
        it(`should detect a job in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isJob', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a job in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isJob', false);
        });
    };
})
