const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_note.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_group.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_page.json'),
    ...require('./data/is_page_as_pg.json'),
    ...require('./data/is_page_by_category.json'),
];

describe('Unit > isNote ', () => {
    for (const url of validUrls) {
        it(`should detect a note in ${url}`, () => {
            const result = match(url, matchers.isNote)
            expect(result).toHaveProperty('note.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a note in ${url}`, () => {
            const result = match(url, matchers.isNote)
            expect(result).toHaveProperty('note', undefined);
        });
    };
})

describe('Main > isNote', () => {
    for (const url of validUrls) {
        it(`should detect a note in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isNote', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a note in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isNote', false);
        });
    };
})
