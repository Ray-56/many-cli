// webpack构建时运行 node output生成配置文件

const fs = require('fs');
const path = require('path');

// 入口文件
let entryFiles = {};
function eachEntryFile(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            const filePath = dir + '/' + file;
            const fname = path.basename(file, '.js');
            entryFiles[fname] = filePath;
        })
    } catch (e) {

    }
};
eachEntryFile('./src/js');
let entrysStr = 'module.exports=' + JSON.stringify(entryFiles);
fs.writeFile('./config/entrys.js', entrysStr, (err) => {
    if (err) throw err;
    console.log('done')
});

// 输出html模板
let pagesArray = [];
function eachFile(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            if (file.indexOf('.html') > -1) {
                let fileObj = {};
                let filePath = dir + '/' + file;
                let chunkName = path.basename(file, '.html');
                fileObj['filename'] = file;
                fileObj['template'] = filePath;
                fileObj['chuckName'] = chunkName;
                pagesArray.push(fileObj);
            };
        })
    } catch (e) {

    }
};
eachFile('./src/pages');

const htmlsPluginStr = 'module.exports=' + JSON.stringify(pagesArray);
fs.writeFile('./config/htmlPages.js', htmlsPluginStr, (err) => {
    if (err) throw err;
    console.log('done')
});