 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUserPhotos);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aUserPhotos', () => {
    for (const url of validUrls) {
        it(`should detect a user photos page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserPhotos);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user photos page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserPhotos);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aUserPhotos', () => {
    for (const url of validUrls) {
        it(`should detect a user photos page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserPhotos', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user photos page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserPhotos', false);
        });
    }
});
