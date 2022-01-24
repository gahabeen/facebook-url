const { parse, craft, CATEGORIES, HOSTNAMES, PROTOCOLS } = require('../index');

// const url = 'https://www.facebook.com/Simply-Clean-Residential-Cleaning-Services-232528504672714/';
// const link = parse(url, { lazy: false });
// const crafter = craft(link, { hostname: HOSTNAMES.basic, protocol: PROTOCOLS.unsecured, strict: false });

// console.log(crafter.aPlaceAndCategory({ place: '123', category: CATEGORIES.CLEANING_SERVICE }));


// const { parse, craft } = require('facebook-url');

const url = 'https://www.facebook.com/EcoFriendlyMaidService/services/?service_id=1368411153266622'
const link = parse(url, { lazy: false }); // lazy=false by default;

const crafter = craft(link)

console.log(crafter.aPage())
