const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const config = {
    entry: {
        // 'app': ['./src/index.js', './src/origin/css/style.css'],
        'js/app': './src/index.js',
        'css/style': './src/origin/css/style.css',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     // _: 'lodash',
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            // inject: 'head'
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    delete: ['/dist/css/style.bundle.js'],
                },
            },
        }),
    ],
    externals: {//excluding dependencies from the output bundles
        jquery: 'jQuery',
        bootstrap: 'bootstrap'
    }
    // optimization: {

    //     moduleIds: 'deterministic',
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: { 
    //                 // usedExports: true,                   
    //                 // test: /[\\/]node_modules[\\/]/,
    //                 // name: 'js/vendors',
    //                 // chunks: 'all'
    //                 name: 'commons',
    //                 chunks: 'initial',
    //                 minChunks: 2
    //             },
    //             default: false
    //         }
    //     }
    // }
};

module.exports = config;