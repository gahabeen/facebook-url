 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aPixel);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
);

describe('Unit > aPixel', () => {
    for (const url of validUrls) {
        it(`should detect a pixel in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPixel);
            expect(result).toHaveProperty('pixel.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a pixel in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPixel);
            expect(result).toHaveProperty('pixel', undefined);
        });
    }
});

describe('Main > aPixel', () => {
    for (const url of validUrls) {
        it(`should detect a pixel in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPixel', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a pixel in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aPixel', false);
        });
    }
});
