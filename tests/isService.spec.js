const { matchers, match } = require('../lib/match');
const facebookUrl = require('../lib/main');
const validUrls = require('./data/is_service.json');
const invalidUrls = [
    ...require('./data/is_not_facebook.json'),
    ...require('./data/is_post.json'),
    ...require('./data/is_event.json'),
    ...require('./data/is_job.json'),
];

describe('Unit > isService ', () => {
    for (const url of validUrls) {
        it(`should detect a service in ${url}`, () => {
            const result = match(url, matchers.isService)
            expect(result).toHaveProperty('service.id');
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a service in ${url}`, () => {
            const result = match(url, matchers.isService)
            expect(result).toHaveProperty('service', undefined);
        });
    };
})

describe('Main > isService', () => {
    for (const url of validUrls) {
        it(`should detect a service in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isService', true);
        });
    };

    for (const url of invalidUrls) {
        it(`should not detect a service in ${url}`, () => {
            expect(facebookUrl(url)).toHaveProperty('matches.isService', false);
        });
    };
})
