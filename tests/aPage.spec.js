const { match, parse, matchersAsKeyed } = require('./methods');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPage);
const invalidUrls = getSamples(data.notMatched, data.aPageByCategory, data.aGroup);

describe('Unit > aPage', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPage);
            expect(result).toHaveProperty('page.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPage);
            expect(result).toHaveProperty('page', undefined);
        });
    }
});

describe('Main > aPage', () => {
    for (const url of validUrls) {
        it(`should detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPage', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPage', false);
        });
    }
});
