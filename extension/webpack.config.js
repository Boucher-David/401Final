const webpack = require('webpack');
const path = require('path');
const DefinePlugin = webpack.DefinePlugin;

const ExtractPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './react/index.js',
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
                                includePaths:[`${__dirname}/client/src/style`]
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
