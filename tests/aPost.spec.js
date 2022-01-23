 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPost);
const invalidUrls = getSamples(
    data.notMatched, data.aPageByCategory,
);

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
            expect(parse(url)).toHaveProperty('matches.aPost', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a post in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPost', false);
        });
    }
});
