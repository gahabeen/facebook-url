const categories = require('../facebook_page_categories.json');

const getCategoriesAsPaths = () => {
    return categories.map((category) => category.replace(/\W/g, '-'));
};

const getCategoriesAsPathsNormalized = () => {
    return getCategoriesAsPaths().map((category) => category.toLowerCase());
};

const isCategoryPath = (path) => {
    return getCategoriesAsPathsNormalized().includes(path.toLowerCase());
};

module.exports = {
    getCategoriesAsPaths,
    isCategoryPath,
};
