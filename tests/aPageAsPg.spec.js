 const { match, parse, matchersAsKeyed } = require('./methods');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageAsPg);
const invalidUrls = getSamples(data.notMatched, data.aPageByCategory, data.aGroup, data.aPage);

describe('Unit > aPageAsPg', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageAsPg);
            expect(result).toHaveProperty('page.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageAsPg);
            expect(result).toHaveProperty('page', undefined);
        });
    }
});

describe('Main > aPageAsPg', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageAsPg', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageAsPg', false);
        });
    }
});
