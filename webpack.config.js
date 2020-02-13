const path = require('path'),
    WebpackShellPlugin = require("webpack-shell-plugin"),
    StyleLintPlugin = require("stylelint-webpack-plugin"),
    styleLintSass = new StyleLintPlugin({
        syntax: "scss",
        configFile: ".stylelintrc"
    }),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/index.html"),
        filename: "index.html"
    }),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    extractSass = new ExtractTextPlugin({
        filename: "style.css"
    }),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    miniCssExtract = new MiniCssExtractPlugin({
        filename: "style.css"
    }),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: {
        app: [
            path.join(__dirname, "./src/index.js"), 
            path.join(__dirname, "./src/scss/index.scss")
        ]
    },
    output: {
       path: path.join(__dirname, "build"),
       filename: "bundle.js",
    },
    devtool: process.env.NODE_ENV === "production" ? "#hidden-source-map" : "#inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                "scss",
                                "node_modules/"
                            ],
                            sourceMap: true,
                            outputStyle: "expanded"
                        }
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader?name=/images/[name].[ext]"
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: "url-loader?limit=100000&name=/fonts/[hash].[ext]"
            },
            {
                test: /\.md$/,
                loader: "raw-loader",
                options: {}
            }
        ]
    },
    plugins: [
        styleLintSass,
        extractSass,
        htmlWebpackPlugin,
        miniCssExtract,
        new WebpackShellPlugin({
            onBuildStart:[
                "echo \033[1;33mMoving files into build/\033[0m",
                "mkdir -p build",
                "cp -R images build/",
                "cp sitemap.xml build/"
            ]
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3000
    }
};
