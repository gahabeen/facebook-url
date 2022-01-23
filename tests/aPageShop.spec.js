 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageShop);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageShop', () => {
    for (const url of validUrls) {
        it(`should detect a page shop in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageShop);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page shop in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageShop);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageShop', () => {
    for (const url of validUrls) {
        it(`should detect a page shop in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageShop', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page shop in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageShop', false);
        });
    }
});
