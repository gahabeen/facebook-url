const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPost.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPageByCategory.json'),
];

describe('Unit > aPost', () => {
    for (const url of validUrls) {
        it(`should detect a post in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPost);
            expect(result).toHaveProperty('post.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a post in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPost);
            expect(result).toHaveProperty('post', undefined);
        });
    }
});

describe('Main > aPost', () => {
    for (const url of validUrls) {
        it(`should detect a post in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPost', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a post in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPost', false);
        });
    }
});
