const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { join } = require('path');

const isDev = process.env.WEBPACK_MODE === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

module.exports = {
    entry: join(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@components': join(__dirname, 'src', 'components'),
            '@public': join(__dirname, 'public')
        }
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            minify: isProd,
            template: join(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.mp3/,
                use: 'file-loader'
            }
        ]
    }
}
