const parseResources = require('./lib/parse');
const craftResources = require('./lib/craft');
const datasetsAccessors = require('./lib/datasets');

module.exports = {
    ...parseResources,
    ...craftResources,
    ...datasetsAccessors,
};
