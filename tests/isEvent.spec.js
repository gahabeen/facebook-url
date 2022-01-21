const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_event.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
];

describe('Unit > isEvent ', () => {
    for (const url of validUrls) {
        it(`should detect a event in ${url}`, () => {
            const result = match(url, matchers.isEvent)
            expect(result).toHaveProperty('event.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a event in ${url}`, () => {
            const result = match(url, matchers.isEvent)
            expect(result).toHaveProperty('event', undefined);
        });
    };
})

describe('Main > isEvent', () => {
    for (const url of validUrls) {
        it(`should detect a event in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isEvent', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a event in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isEvent', false);
        });
    };
})
