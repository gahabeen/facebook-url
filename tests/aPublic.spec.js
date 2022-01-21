const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPublic.json');
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
];

describe('Unit > aPublic', () => {
    for (const url of validUrls) {
        it(`should detect a public in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPublic);
            expect(result).toHaveProperty('public.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a public in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPublic);
            expect(result).toHaveProperty('public', undefined);
        });
    }
});

describe('Main > aPublic', () => {
    for (const url of validUrls) {
        it(`should detect a public in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPublic', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a public in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPublic', false);
        });
    }
});
