const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './src/javascript/index.ts',
    output: {
        filename: 'javascript.min.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve : {
        extensions : [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
