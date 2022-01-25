const domains = require('./data/domains.json');
const categoriesDataset = require('./data/categories.json');
const languagesDataset = require('./data/languages.json');

const findCategoriesBySegments = (segments) => {
    const normalizedSegments = segments.map((s) => s.toLowerCase());
    return Object.values(categoriesDataset).reduce((acc, category) => {
        if (normalizedSegments.includes(category.segment.toLowerCase())) {
            acc.push(category);
        }
        return acc;
    }, []);
};

const isCategoryPath = (path) => {
    return Object.values(categoriesDataset).map((c) => c.segment.toLowerCase()).includes(path.toLowerCase());
};

const findDomainByHostname = (hostname) => {
    let subHostname = hostname;
    while (subHostname.includes('.')) {
        // eslint-disable-next-line no-loop-func
        const foundDomain = domains.find((domain) => domain.hostname.endsWith(subHostname));
        if (foundDomain) return foundDomain;
        subHostname = subHostname.split('.').slice(1).join('.');
    }
};

const getQueryableDomains = (options) => {
    const { levelMax = 10, languages = ['en'], exclude = [] } = options || {};
    return domains.filter((domain) => {
        return (
            domain.interestingToQuery
            && !exclude.includes(domain.hostname)
            && typeof domain.queryPriority === 'number'
            && domain.queryPriority <= levelMax
            && (!domain.language || languages.includes(domain.language))
        );
    });
};

const findLanguage = (code) => {
    return languagesDataset[code];
};

module.exports = {
    isCategoryPath,
    findDomainByHostname,
    findCategoriesBySegments,
    findLanguage,
    getQueryableDomains,
};
