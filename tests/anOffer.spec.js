 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.anOffer);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
);

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
            expect(parse(url)).toHaveProperty('matches.anOffer', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect an offer in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.anOffer', false);
        });
    }
});
