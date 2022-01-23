 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aVideo);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.anEvent,
);

describe('Unit > aVideo', () => {
    for (const url of validUrls) {
        it(`should detect a video in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aVideo);
            expect(result).toHaveProperty('video.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a video in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aVideo);
            expect(result).toHaveProperty('video', undefined);
        });
    }
});

describe('Main > aVideo', () => {
    for (const url of validUrls) {
        it(`should detect a video in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aVideo', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a video in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aVideo', false);
        });
    }
});
