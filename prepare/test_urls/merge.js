const fs = require('fs');
const path = require('path');

const { parse } = require('../../index');

for (const file of fs.readdirSync(path.join(__dirname, './sorted'))) {
    console.log('file', file);
    const sorted = JSON.parse(fs.readFileSync(path.join(__dirname, `./sorted/${file}`)));
    const testPath = path.join(__dirname, `../../tests/data/${file}`);
    const testData = fs.existsSync(testPath) ? JSON.parse(fs.readFileSync(testPath)) : [];
    const mixed = [...new Set([...sorted, ...testData])];
    const filtered = mixed.filter((item) => parse(item, { lazy: true }).matches[file.split('.')[0]]);
    fs.writeFileSync(testPath, JSON.stringify(filtered, null, 2));
}
