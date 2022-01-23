 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageFundraisers);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageFundraisers', () => {
    for (const url of validUrls) {
        it(`should detect a page fundraisers in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageFundraisers);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page fundraisers in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageFundraisers);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageFundraisers', () => {
    for (const url of validUrls) {
        it(`should detect a page fundraisers in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageFundraisers', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page fundraisers in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageFundraisers', false);
        });
    }
});
