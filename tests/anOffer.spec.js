const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/anOffer.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

describe('Unit > anOffer', () => {
    for (const url of validUrls) {
        it(`should detect an offer in ${url}`, () => {
            const result = match(url, matchersAsKeyed.anOffer);
            expect(result).toHaveProperty('offer.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect an offer in ${url}`, () => {
            const result = match(url, matchersAsKeyed.anOffer);
            expect(result).toHaveProperty('offer', undefined);
        });
    }
});

describe('Main > anOffer', () => {
    for (const url of validUrls) {
        it(`should detect an offer in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.anOffer', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect an offer in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.anOffer', false);
        });
    }
});
