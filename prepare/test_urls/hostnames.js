/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

const rawUrls = require('./raw-urls.json');
const datasets = require('../../lib/datasets')

const hostnames = {};

for (const rawUrl of rawUrls) {
    try {
        const { hostname } = new URL(rawUrl);
        if (!datasets.findDomainByHostname(hostname)) {
            hostnames[hostname] = (hostname in hostnames ? hostnames[hostname] + 1 : 1);
        }
    } catch (error) { }
}

fs.writeFileSync(path.join(__dirname, `./hostnames.json`), JSON.stringify(hostnames, null, 2));
