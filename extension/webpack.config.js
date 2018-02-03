const webpack = require('webpack');
const path = require('path');
const DefinePlugin = webpack.DefinePlugin;

const ExtractPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './react/index.js',
    plugins: [
        new ExtractPlugin('popup.css'),
    ],
    output: {
        // Webpack prefers an absolute path:
        path: path.resolve(__dirname, './bundle/'),
        filename: 'popup.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader', 
                            options: {
                                sourceMap:true
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths:[`${__dirname}/bundle/style.scss`]
                            }
                        }
                    ]
                })
            },
            {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
        ]
    }
}
