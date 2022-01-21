const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_group.json');
const invalidUrls = [...require('./data/is_not_facebook.json'), ...require('./data/is_page.json')];

describe('Unit > isGroup ', () => {
    for (const url of validUrls) {
        it(`should detect a group in ${url}`, () => {
            const result = match(url, matchers.isGroup)
            expect(result).toHaveProperty('group.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a group in ${url}`, () => {
            const result = match(url, matchers.isGroup)
            expect(result).toHaveProperty('group', undefined);
        });
    };
})

describe('Main > isGroup', () => {
    for (const url of validUrls) {
        it(`should detect a group in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isGroup', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a group in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isGroup', false);
        });
    };
})
