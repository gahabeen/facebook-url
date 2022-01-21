const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aNote.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

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
            expect(facebookUrl(url)).toHaveProperty('matches.aNote', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a note in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aNote', false);
        });
    }
});
