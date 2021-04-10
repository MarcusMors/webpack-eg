/** @type {import('webpack').Configuration} */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"), //resolve return the absolute path in the OS
		filename: "main.js",
		assetModuleFilename: "assets/images/[hash][ext][query]",
	},
	resolve: {
		extensions: ["js"], //the files that will be read
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			// {
			// 	test: /\.css|.styl$/i,
			// 	use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
			// },
			// {
			// 	test: /\.s?css$/,
			// 	use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			// },
			{
				test: /\.png$/,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: "10000", // or bool
						mimetype: "application/font-woff", //specify the MIME type which the file will be aligned.
						//MIME = Multipurpose Internet Mail Extensions
						//it is the internet standard way to send info
						name: "[name].[ext]",
						outputPath: "./assets/fonts/",
						publicPath: "./assets/fonts/",
						esModule: false,
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true, //inject the bundle to the html template
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images",
				},
			],
		}),
	],
}
