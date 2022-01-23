 const { match, parse, matchersAsKeyed } = require('./methods');


const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aUserFriends);
const invalidUrls = getSamples(
    data.notMatched,
    data.aPost,
    data.anEvent,
);

describe('Unit > aUserFriends', () => {
    for (const url of validUrls) {
        it(`should detect a user friends page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserFriends);
            expect(result).toHaveProperty('matched', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user friends page in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aUserFriends);
            expect(result).toHaveProperty('matched', false);
        });
    }
});

describe('Main > aUserFriends', () => {
    for (const url of validUrls) {
        it(`should detect a user friends page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserFriends', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a user friends page in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aUserFriends', false);
        });
    }
});
