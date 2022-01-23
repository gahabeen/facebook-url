const fs = require('fs');
const path = require('path');

const categories = require('./raw_categories.json').data;

function flatten(data) {
    const list = [];
    for (const category of data) {
        list.push({
            name: category.name,
            segment: category.name.replace(/\W/g, '-'),
            enum: category.api_enum,
            id: category.id,
        });
        if (category.fb_page_categories) {
            list.push(...flatten(category.fb_page_categories));
        }
    }
    return list;
}

fs.writeFileSync(path.resolve(__dirname, './categories.json'), JSON.stringify(flatten(categories), null, 2));
