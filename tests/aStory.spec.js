 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aStory);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
);

describe('Unit > aStory', () => {
    for (const url of validUrls) {
        it(`should detect a story in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aStory);
            expect(result).toHaveProperty('story.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a story in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aStory);
            expect(result).toHaveProperty('story', undefined);
        });
    }
});

describe('Main > aStory', () => {
    for (const url of validUrls) {
        it(`should detect a story in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aStory', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a story in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aStory', false);
        });
    }
});
