const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aJob.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/aGroup.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aPage.json'),
    ...require('./data/aPageAsPg.json'),
    ...require('./data/aPageByCategory.json'),
];

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
            expect(facebookUrl(url)).toHaveProperty('matches.aJob', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a job in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aJob', false);
        });
    }
});
