module.exports = {
    entry: './handlers/index.js',
    target: 'node',
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: __dirname,
            exclude: /node_modules/,
        }, {
            test: /.json$/,
            loaders: ['json']
        }, {
            test: /\.node$/,
            loader: 'node-loader'
        }],
        noParse: [/aws-sdk/]
    },
    externals: {'aws-sdk': 'aws-sdk'}
}