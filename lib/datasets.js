const domains = require('./data/domains.json');
const categories = require('./data/categories.json');
const languages = require('./data/languages.json');

const findCategoriesBySegments = (segments) => {
    const normalizedSegments = segments.map((s) => s.toLowerCase());
    return Object.values(categories).reduce((acc, category) => {
        if (normalizedSegments.includes(category.segment.toLowerCase())) {
            acc.push(category);
        }
        return acc;
    }, []);
};

const isCategoryPath = (path) => {
    return Object.values(categories).map((c) => c.segment.toLowerCase()).includes(path.toLowerCase());
};

const findDomainByHostname = (hostname) => {
    return domains.find((domain) => domain.hostname.endsWith(hostname));
};

const findLanguage = (code) => {
    return languages[code];
};

module.exports = {
    isCategoryPath,
    findDomainByHostname,
    findCategoriesBySegments,
    findLanguage,
};
