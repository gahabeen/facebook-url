 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aNote);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
);

describe('Unit > aNote', () => {
    for (const url of validUrls) {
        it(`should detect a note in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aNote);
            expect(result).toHaveProperty('note.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a note in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aNote);
            expect(result).toHaveProperty('note', undefined);
        });
    }
});

describe('Main > aNote', () => {
    for (const url of validUrls) {
        it(`should detect a note in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aNote', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a note in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aNote', false);
        });
    }
});
