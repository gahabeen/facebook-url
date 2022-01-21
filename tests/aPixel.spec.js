const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPixel.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

describe('Unit > aPixel', () => {
    for (const url of validUrls) {
        it(`should detect a pixel in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPixel);
            expect(result).toHaveProperty('pixel.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a pixel in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPixel);
            expect(result).toHaveProperty('pixel', undefined);
        });
    }
});

describe('Main > aPixel', () => {
    for (const url of validUrls) {
        it(`should detect a pixel in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPixel', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a pixel in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPixel', false);
        });
    }
});
