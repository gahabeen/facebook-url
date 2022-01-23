 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageEvents);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageEvents', () => {
    for (const url of validUrls) {
        it(`should detect a page events in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageEvents);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page events in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageEvents);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageEvents', () => {
    for (const url of validUrls) {
        it(`should detect a page events in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageEvents', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page events in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageEvents', false);
        });
    }
});
