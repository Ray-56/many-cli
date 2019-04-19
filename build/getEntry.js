const glob = require('glob');
const path = require('path');

module.exports = function getEntry() {
    const entry = {};
    // glob.sync(path.resolve(__dirname, '../src/pages/*/')).forEach(name => {
    //     const key = name.slice(name.lastIndexOf('/') + 1);
    //     entry[key] = name + '/index.ts';
    // });
    glob.sync('./src/pages/*').forEach(name => {
        const key = name.slice(name.lastIndexOf('/') + 1);
        entry[key] = name + '/index.ts';
    });

    return entry;
}