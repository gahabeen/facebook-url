 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageOffers);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageOffers', () => {
    for (const url of validUrls) {
        it(`should detect a page offers in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageOffers);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page offers in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageOffers);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageOffers', () => {
    for (const url of validUrls) {
        it(`should detect a page offers in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageOffers', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page offers in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageOffers', false);
        });
    }
});
