//webpack common config

const {resolve} = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const CopyWebpackPlugin = require('copy-webpack-plugin')


const isDev = process.env.NODE_ENV == 'development'

const config = {
    output: {
        filename: 'app.bundle.js',
        path: resolve(__dirname, '../bin'),
        publicPath: '/',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss', '.sass', '.css', '.svg']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                enforce: 'pre',
                use: [
                    "babel-loader",
                    "eslint-loader",
                ]
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/jpg',
                        name: '/assets/[name].[ext]'
                    }
                }
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/png',
                        name: '/assets/[name].[ext]'
                    }
                }
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        mimetype: 'application/font-woff',
                        name: 'fonts/[hash].[ext]'
                    }
                },
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/, /bin/],
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true, // true outputs JSX tags
                            //     svgo: {
                            //         plugins: [{removeTitle: false}],
                            //         floatPrecision: 2
                            //     }
                        }
                    }
                ]
            },
            {
                test: /\.(css|sass|scss)/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!sass-loader'
                    }
                )
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            },
            _development_: isDev
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new CopyWebpackPlugin([
        //     {from:'assets/svg',to:'assets/svg'},
        //     {from:'assets/*.png'},
        //     {from:'assets/*.jpg'},
        // ])
    ]
}


module.exports = config
