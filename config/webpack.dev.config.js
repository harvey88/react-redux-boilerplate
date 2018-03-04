const webpack = require('webpack');
const config = require('./webpack.common.config.js');

config.devtool = 'source-map';

config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'babel-polyfill',
    './src/app.jsx'
];

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

config.devServer = {
    hot: true,
    inline: true,
    //contentBase: resolve(__dirname, './public'),
    publicPath: '/',
    proxy: {
        '/api/*': {
            target: 'http://api.ping.k-3soft.com',
            secure: false
        }
    },
};

module.exports = config;
