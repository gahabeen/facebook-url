const { parse, craft, CATEGORIES, HOSTNAMES, PROTOCOLS } = require('../index');

const url = 'https://www.facebook.com/Simply-Clean-Residential-Cleaning-Services-232528504672714/';
const link = parse(url, { lazy: false });
const page = craft(link, { hostname: HOSTNAMES.basic, protocol: PROTOCOLS.unsecured }).aPlaceAndCategory(CATEGORIES.CLEANING_SERVICE);

console.log(page);
