module.exports = {
    mode: 'development',
    entry: './src/javascript/index.ts',
    output: {
        filename: 'javascript.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve : {
        extensions : [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    plugins: [
    ]
};
