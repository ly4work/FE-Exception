const path = require('path')
const webpack = require('webpack')
const resolve = path.resolve
const mode = process.env.NODE_ENV
const isDev = mode === 'development'
module.exports = {
    mode,
    entry: {
        exception: resolve(__dirname, './src/exception.ts')
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: isDev ? '[name].js' : '[name].min.js'
    },
    devtool: 'cheap-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }]
    },
    resolve: {
        extensions: [
            '.ts'
        ]
    }
}