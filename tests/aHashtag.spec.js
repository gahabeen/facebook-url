const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aHashtag.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
    ...require('./data/aJob.json'),
    ...require('./data/aVideo.json'),
    ...require('./data/aPublic.json'),
];

describe('Unit > aHashtagSearch ', () => {
    for (const url of validUrls) {
        it(`should detect a hashtag in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aHashtagSearch)
            expect(result).toHaveProperty('hashtag.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a hashtag in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aHashtagSearch)
            expect(result).toHaveProperty('hashtag', undefined);
        });
    };
})

describe('Main > aHashtagSearch', () => {
    for (const url of validUrls) {
        it(`should detect a hashtag in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aHashtagSearch', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a hashtag in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aHashtagSearch', false);
        });
    };
})
