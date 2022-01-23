const { match, parse, matchersAsKeyed } = require('./methods');

const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aJob);
const invalidUrls = getSamples(
    data.notMatched, data.aPost, data.aGroup, data.anEvent,
    data.aPage, data.aPageAsPg, data.aPageByCategory,
    data.aVideo, data.aPublic,
);

describe('Unit > aJob', () => {
    for (const url of validUrls) {
        it(`should detect a job in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aJob);
            expect(result).toHaveProperty('job.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a job in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aJob);
            expect(result).toHaveProperty('job', undefined);
        });
    }
});

describe('Main > aJob', () => {
    for (const url of validUrls) {
        it(`should detect a job in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aJob', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a job in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aJob', false);
        });
    }
});
