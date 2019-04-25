console.log('header')

const arr = [
    {
        name: '首页',
        fileName: 'index',
    },
    {
        name: '页面1',
        fileName: 'page1',
    },
    {
        name: '页面2',
        fileName: 'page2',
    },
    {
        name: '页面3',
        fileName: 'page3',
    },
    {
        name: '关于',
        fileName: 'about',
    }
];

let domStr = '';
arr.forEach(i => {
    const current = `<a href="${i.fileName}.html">${i.name}</a>`;
    domStr += current;
});
console.log(domStr);
const header = $(`<nav>${domStr}</nav>`);

$('body').prepend(header);