 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPhoto);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.anEvent,
);

describe('Unit > aPhoto', () => {
    for (const url of validUrls) {
        it(`should detect a photo in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPhoto);
            expect(result).toHaveProperty('photo.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a photo in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPhoto);
            expect(result).toHaveProperty('photo', undefined);
        });
    }
});

describe('Main > aPhoto', () => {
    for (const url of validUrls) {
        it(`should detect a photo in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPhoto', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a photo in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPhoto', false);
        });
    }
});
