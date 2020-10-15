const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './src/javascript/index.tsx',
    output: {
        filename: 'javascript.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly:true 
                }
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            }
        ]
    },
    resolve : {
        extensions : [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    devtool: "source-map",
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
};
