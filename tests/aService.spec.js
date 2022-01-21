const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/aService.json');
const invalidUrls = [
    ...require('./data/not_facebook.json'),
    ...require('./data/aPost.json'),
    ...require('./data/anEvent.json'),
    ...require('./data/aJob.json'),
];

describe('Unit > aService', () => {
    for (const url of validUrls) {
        it(`should detect a service in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aService);
            expect(result).toHaveProperty('service.id');
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a service in ${url}`, () => {
            const result = match(url, matchersAsKeyed.aService);
            expect(result).toHaveProperty('service', undefined);
        });
    }
});

describe('Main > aService', () => {
    for (const url of validUrls) {
        it(`should detect a service in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aService', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a service in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.aService', false);
        });
    }
});
