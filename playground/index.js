const { parse } = require('../index');

const link = parse('https://www.facebook.com/peopleslawnlandscapeflorida');

console.log(link.is.aUser);
console.log(link.data);
