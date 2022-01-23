 const { match, parse, matchersAsKeyed } = require('./methods');



const { data, getSamples } = require('./data');

const validUrls = getSamples(data.aService);
const invalidUrls = getSamples(
    data.notMatched, data.aJob, data.anEvent,
);

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
            expect(parse(url)).toHaveProperty('matches.aService', true);
        });
    }

    for (const url of invalidUrls) {
        it(`should not detect a service in ${url}`, () => {
            expect(parse(url)).toHaveProperty('matches.aService', false);
        });
    }
});
