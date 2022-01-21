const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aVideo.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/anEvent.json'),
];

describe('Unit > aVideo', () => {
    for (const url of validUrls) {
        it(`should detect a video in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aVideo);
            expect(result).toHaveProperty('video.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a video in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aVideo);
            expect(result).toHaveProperty('video', undefined);
        });
    }
});

describe('Main > aVideo', () => {
    for (const url of validUrls) {
        it(`should detect a video in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aVideo', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a video in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aVideo', false);
        });
    }
});
