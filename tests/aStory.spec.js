const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aStory.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

describe('Unit > aStory', () => {
    for (const url of validUrls) {
        it(`should detect a story in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aStory);
            expect(result).toHaveProperty('story.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a story in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aStory);
            expect(result).toHaveProperty('story', undefined);
        });
    }
});

describe('Main > aStory', () => {
    for (const url of validUrls) {
        it(`should detect a story in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aStory', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a story in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aStory', false);
        });
    }
});
