const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_video.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_event.json'),
];

describe('Unit > isVideo ', () => {
    for (const url of validUrls) {
        it(`should detect a video in ${url}`, () => {
            const result = match(url, matchers.isVideo)
            expect(result).toHaveProperty('video.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a video in ${url}`, () => {
            const result = match(url, matchers.isVideo)
            expect(result).toHaveProperty('video', undefined);
        });
    };
})

describe('Main > isVideo', () => {
    for (const url of validUrls) {
        it(`should detect a video in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isVideo', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a video in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isVideo', false);
        });
    };
})
