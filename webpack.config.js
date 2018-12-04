var webpack = require("webpack");

module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist/assets",
        filename: "bundle.js",
        publicPath: "assets"
    },
    devServer: {
        inline: true,
        contentBase: __dirname + "/dist",
        port: 3000
    },
    module: {
        rules: [{    test: /\.jsx?$/,         // Match both .js and .jsx files
    exclude: /node_modules/,
    loader: "babel-loader",
    query:
      {
        presets:['react']
      }
        }]
    }
}
