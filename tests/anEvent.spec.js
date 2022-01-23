 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.anEvent);
const invalidUrls = getSamples(data.notMatched, data.aPost);

describe('Unit > anEvent', () => {
    for (const url of validUrls) {
        it(`should detect a event in ${url}`, () => {
            const result = match(url, matchersAsKeyed.anEvent);
            expect(result).toHaveProperty('event.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a event in ${url}`, () => {
            const result = match(url, matchersAsKeyed.anEvent);
            expect(result).toHaveProperty('event', undefined);
        });
    }
});

describe('Main > anEvent', () => {
    for (const url of validUrls) {
        it(`should detect a event in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.anEvent', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a event in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.anEvent', false);
        });
    }
});
