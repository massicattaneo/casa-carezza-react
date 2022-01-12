const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, argv) => {
    const {
        mode: nodeEnv = 'development'
    } = argv;
    const devMode = nodeEnv !== 'production';
    const pages = ['index', 'bacheca', 'foto', 'contattaci', 'cerca', 'area_proprietari'];
    return {
        entry: {
            app: './src/index.js',
            vendor: Object.keys(pkg.dependencies)
        },
        output: {
            filename: devMode ? '[name].js' : '[name].[hash].js',
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: devMode ? '[name].js' : '[name].[chunkhash].js',
            publicPath: '/'
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all'
                    }
                }
            }
        },
        devServer: {
            historyApiFallback: {
                disableDotRule: true,
                index: '/index.html'
            }
        },
        watchOptions: {
            poll: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: 'src/vendors', to: 'vendors' },
                    { from: 'src/gallery-home', to: 'gallery-home' }
                ]
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both optionns are optional
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            }),
            new SitemapPlugin({
                base: 'http://casacarezza.it',
                paths: pages.map(name => ({
                    path: `${name}.html`,
                    lastmod: '2021-07-31',
                    priority: 1,
                    changefreq: 'monthly'
                }))
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(nodeEnv)
            })
        ].concat(pages.map(name => new HtmlWebpackPlugin({
            filename: `${name}.html`,
            chunks: ['vendor', 'app'],
            template: path.join(__dirname, 'public', 'index.html'),
            templateParameters: {
                part: fs.readFileSync(path.resolve(__dirname, `parts/${name}.html`))
            }
        })))
    };
};
