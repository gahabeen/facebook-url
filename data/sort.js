/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

const { matchAll } = require('../lib/match');
const rawUrls = require('./raw-urls.json');

const sorted = {};
const push = (key, value) => {
    if (!(key in sorted)) { sorted[key] = []; }
    sorted[key].push(value);
};

let count = 0;
for (const rawUrl of rawUrls) {
    console.log(`Raw url ${count++}/${rawUrls.length}`);
    const result = matchAll(rawUrl);

    for (const key in result.matches) {
        if (result.matches[key]) push(key, result.url);
    }
    if (!result.matched) {
        push('unmatched', result.url);
    }
}

for (const key in sorted) {
    console.log(`${key}: ${sorted[key].length}`);
    fs.writeFileSync(path.join(__dirname, `./sorted/${key}.json`), JSON.stringify(sorted[key], null, 2));
}
