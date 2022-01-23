 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageAbout);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aPageAbout', () => {
    for (const url of validUrls) {
        it(`should detect an about page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageAbout);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect an about page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageAbout);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageAbout', () => {
    for (const url of validUrls) {
        it(`should detect an about page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageAbout', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect an about page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageAbout', false);
        });
    }
});
