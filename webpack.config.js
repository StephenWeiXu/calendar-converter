const path = require('path'),
    WebpackShellPlugin = require("webpack-shell-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/index.html"),
        filename: "index.html"
    }),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    extractSass = new ExtractTextPlugin({
        filename: "style.css"
    });

module.exports = {
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
                test: /\.md$/,
                loader: "raw-loader",
                options: {}
            }
        ]
    },
    plugins: [
        extractSass,
        htmlWebpackPlugin,
        new WebpackShellPlugin({
            onBuildStart:[
                "echo \033[1;33mMoving files into build/\033[0m",
                "mkdir -p build",
                "cp -R markdown build/"
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
