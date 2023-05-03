const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin({}),
			new UglifyJsPlugin({})
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 4200
	},
	plugins: [
		new HTMLPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	],
	resolve: {
		extensions: ['.js', '.ts']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	}
}
