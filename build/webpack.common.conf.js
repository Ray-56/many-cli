const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const getEntry = require('./getEntry');

const entry = getEntry();
module.exports = {
    // entry: {
    //     app: './src/index.ts',
    // },
    entry: entry,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Prodoction',
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            }
        ]
    }
}

const htmlArray = [];
Object.keys(entry).forEach(ele => {
    htmlArray.push({
        _html: ele,
        title: '',
        chunks: ['vendor', 'common', ele]
    });
});

console.log(htmlArray);

function getHtmlConfig(name, chunks) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: `${name}.html`,
        inject: true,
        hash: false,
        chunks: chunks,
        minify: process.env.NODE_ENV !== 'production' ? false : {
            removeComments: true, // 移除 html 中的注释
            collapseWhitespace: true, // 折叠空白区域，压缩代码
            removeAttributeQuotes: true, // 去除属性引用
        }
    }
}

htmlArray.forEach(({ _html, chunks }) => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin(getHtmlConfig(_html, chunks))
    );
});