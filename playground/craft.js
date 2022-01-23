const { parse, craft } = require('../index');

const link = parse('https://www.facebook.com/pages/category/Cleaning-Service/Simply-Clean-Residential-Cleaning-Services-232528504672714/');
const page = craft.onMobile.aPageAsPageCategory(link);

console.log(link.matchers);
console.log(page);
