 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageCommunity);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aPageCommunity', () => {
    for (const url of validUrls) {
        it(`should detect a page community in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageCommunity);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page community in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageCommunity);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageCommunity', () => {
    for (const url of validUrls) {
        it(`should detect a page community in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageCommunity', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page community in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageCommunity', false);
        });
    }
});
