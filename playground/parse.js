const { parse } = require('../index');

// const link = parse('https://www.facebook.com/pages/category/Cleaning-Service/Simply-Clean-Residential-Cleaning-Services-232528504672714/');
const link = parse('https://ne-np.facebook.com/pgdreamsrealty/?ref=page_internal', { lazy: true });

console.log(link.matches.aUser);
console.log(link.data);
