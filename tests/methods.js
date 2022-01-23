const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/parse');

module.exports = {
    matchersAsKeyed,
    match,
    parse: (url) => parse(url, { lazy: true }),
};
