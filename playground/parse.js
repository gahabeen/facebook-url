const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const parse = require('../lib/parse');

const url = 'https://ne-np.facebook.com/pgdreamsrealty/?ref=page_internal'
const link = parse(url, { lazy: true });

console.log(link.matches.aPageAsPg);
console.log(link.data);

// const matched = match(url, matchersAsKeyed.aUser);
// console.log(matched);
