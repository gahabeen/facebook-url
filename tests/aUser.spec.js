const { match, parse, matchersAsKeyed } = require('./methods');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUser);
const invalidUrls = getSamples(
    data.notMatched, data.aGroup, data.aPageAsPg, data.aPageByCategory,
);

describe('Unit > aUser', () => {
    for (const url of validUrls) {
        it(`should detect a user in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUser);
            expect(result).toHaveProperty('user.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUser);
            expect(result).toHaveProperty('user', undefined);
        });
    }
});

describe('Main > aUser', () => {
    for (const url of validUrls) {
        it(`should detect a user in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUser', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUser', false);
        });
    }
});
