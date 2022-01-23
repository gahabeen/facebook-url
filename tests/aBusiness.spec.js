const { match, parse, matchersAsKeyed } = require('./methods');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aBusiness);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.aGroup,
    data.anEvent,
    data.aPage,
    data.aPageAsPg,
    data.aPageByCategory,
);

describe('Unit > aBusiness', () => {
    for (const url of validUrls) {
        it(`should detect a business in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aBusiness);
            expect(result).toHaveProperty('matched', true);
            // expect(result).toHaveProperty('business.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a business in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aBusiness);
            expect(result).toHaveProperty('matched', false);
            expect(result).toHaveProperty('business', undefined);
        });
    }
});

describe('Main > aBusiness', () => {
    for (const url of validUrls) {
        it(`should detect a business in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aBusiness', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a business in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aBusiness', false);
        });
    }
});
