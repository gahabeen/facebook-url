const { matchersAsKeyed } = require('../lib/matchers');
const { match } = require('../lib/match');
const { parse } = require('../lib/parse');

const url = 'https://hi-in.facebook.com/cnn/posts/10160875540026509';
const link = parse(url, { lazy: false });

console.log(link.matches.aFacebookDomain);
console.log(link.data);

// const matched = match(url, matchersAsKeyed.aUser);
// console.log(matched);
