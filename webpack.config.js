const webpack = require('webpack');

const isDev = process.env.NODE_ENV == 'development';

module.exports = isDev
    ? require('./config/webpack.dev.config.js')
    : require('./config/webpack.prod.config.js');