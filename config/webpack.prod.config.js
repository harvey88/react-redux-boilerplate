const webpack = require('webpack');
const config = require('./webpack.common.config.js');

config.entry = [
    'babel-polyfill',
    './src/app.jsx'
];

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));

module.exports = config;