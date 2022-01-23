 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUserVideos);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aUserVideos', () => {
    for (const url of validUrls) {
        it(`should detect a user videos page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserVideos);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user videos page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserVideos);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aUserVideos', () => {
    for (const url of validUrls) {
        it(`should detect a user videos page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserVideos', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user videos page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserVideos', false);
        });
    }
});
