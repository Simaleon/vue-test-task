const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader');

module.exports = [
    function (env, argv) {
        return {
            name: 'client',
            mode: env.production ? 'production' : 'development',
            entry: {
                vue: 'vue',
                main: {
                    import: './src/index.js',
                    dependOn: 'vue'
                }
            },
            output: {
                path: path.resolve(__dirname, './dist/scripts'),
                filename: '[name].js',
                clean: true
            },
            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader',
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
            plugins: [
                new VueLoaderPlugin(),
                new HtmlWebpackPlugin({
                    title: 'Vue calendar',
                    template: 'src/index.html',
                    filename: '../index.html',
                    chunks: ['vue', 'main'],
                    minify: env.production
                })
            ],
            resolve: {
                extensions: ['.js']
            }
        };
    }
];