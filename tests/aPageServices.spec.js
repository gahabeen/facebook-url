 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageServices);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageServices', () => {
    for (const url of validUrls) {
        it(`should detect a page services in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageServices);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page services in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageServices);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageServices', () => {
    for (const url of validUrls) {
        it(`should detect a page services in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageServices', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page services in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageServices', false);
        });
    }
});
