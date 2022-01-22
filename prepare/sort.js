/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

const { parse } = require('../index');
const rawUrls = require('./raw-urls.json');

const sorted = {};
const push = (key, value) => {
    if (!(key in sorted)) { sorted[key] = []; }
    sorted[key].push(value);
};

let count = 0;
for (const rawUrl of rawUrls) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Raw url ${count++}/${rawUrls.length} (${(100 * count) / rawUrls.length}%)`);
    // const link = parse(rawUrl);
    const link = parse(rawUrl, { loadAll: false });

    for (const key in link.matches) {
        if (link.matches[key]) push(key, link.url);
    }

    if (!link.data.matched) {
        push('notMatched', link.url);
    }
}

for (const key in sorted) {
    fs.writeFileSync(path.join(__dirname, `./sorted/${key}.json`), JSON.stringify(sorted[key], null, 2));
}
