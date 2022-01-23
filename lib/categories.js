const categories = require('./data/categories.json');

const findCategoriesBySegments = (segments) => {
    const normalizedSegments = segments.map((s) => s.toLowerCase());
    return categories.reduce((acc, category) => {
        if (normalizedSegments.includes(category.segment.toLowerCase())) {
            acc.push(category);
        }
        return acc;
    }, []);
};

const isCategoryPath = (path) => {
    return categories.map((c) => c.segment.toLowerCase()).includes(path.toLowerCase());
};

module.exports = {
    isCategoryPath,
    findCategoriesBySegments,
};
