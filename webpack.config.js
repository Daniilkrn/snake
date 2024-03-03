const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = (env) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'src', 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: './src/main.css'
            }),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'src', 'images'), to: path.resolve(__dirname, 'build', 'src', 'images') },
                ],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader','sass-loader'],
                },
            ],
        },
    }
}