const fs = require('fs');
const path = require('path');

for (const file of fs.readdirSync(path.join(__dirname, './sorted'))) {
    const sorted = JSON.parse(fs.readFileSync(path.join(__dirname, `./sorted/${file}`)));
    const testPath = path.join(__dirname, `../tests/data/${file}`);
    const testData = fs.existsSync(testPath) ? JSON.parse(fs.readFileSync(testPath)) : [];
    const mixed = new Set([...sorted, ...testData]);
    fs.writeFileSync(testPath, JSON.stringify([...mixed], null, 2));
}
