const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aPerson.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

describe('Unit > aPerson', () => {
    for (const url of validUrls) {
        it(`should detect a person in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPerson);
            expect(result).toHaveProperty('person.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a person in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aPerson);
            expect(result).toHaveProperty('person', undefined);
        });
    }
});

describe('Main > aPerson', () => {
    for (const url of validUrls) {
        it(`should detect a person in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPerson', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a person in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aPerson', false);
        });
    }
});
