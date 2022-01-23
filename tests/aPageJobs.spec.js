 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPageJobs);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
);

describe('Unit > aPageJobs', () => {
    for (const url of validUrls) {
        it(`should detect a page photo in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageJobs);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page photo in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPageJobs);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aPageJobs', () => {
    for (const url of validUrls) {
        it(`should detect a page photo in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageJobs', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a page photo in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPageJobs', false);
        });
    }
});
