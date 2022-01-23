const { match, parse, matchersAsKeyed } = require('./methods');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aFacebookDomain);
const invalidUrls = getSamples(data.notMatched);

describe('Unit > aFacebookDomain', () => {
    for (const url of validUrls) {
        it(`should detect a facebook domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aFacebookDomain);
            expect(result).toHaveProperty('facebook', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a facebook domain in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aFacebookDomain);
            expect(result).toHaveProperty('facebook', undefined);
        });
    }
});

describe('Main > aFacebookDomain', () => {
    for (const url of validUrls) {
        it(`should detect a facebook domain in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aFacebookDomain', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a facebook domain in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aFacebookDomain', false);
        });
    }
});
