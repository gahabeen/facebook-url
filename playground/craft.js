const { parse, craft, CATEGORIES, HOSTNAMES, PROTOCOLS } = require('../index');
const { URL } = require('url')

const url = 'https://es-la.es-es.prod.facebook.com/LifeMaidEasyLLC/reviews/?post_id=1039241782762293&referrer=page_recommendations_home_card';
const link = parse(url, { lazy: false });
// const crafter = craft(link, { hostname: HOSTNAMES.basic, protocol: PROTOCOLS.unsecured, strict: false });

// console.log(crafter.aPlaceAndCategory({ place: '123', category: CATEGORIES.CLEANING_SERVICE }));
console.log(link.matches.aPageReviews)
console.log(link.data)
