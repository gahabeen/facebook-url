 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageGroups);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageGroups', () => {
    for (const url of validUrls) {
        it(`should detect a page groups in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageGroups);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page groups in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageGroups);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageGroups', () => {
    for (const url of validUrls) {
        it(`should detect a page groups in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageGroups', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page groups in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageGroups', false);
        });
    }
});
