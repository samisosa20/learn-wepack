// Node modules
const merge = require("webpack-merge");
const path = require("path");

// Config files
const commonConfig = require("./webpack.common.js");
const settings = require("./webpack.settings.js");

// Configure the webpack-dev-server
const configureDevServer = () => {
  return {
    port: settings.devServerConfig.port(),
    hot: true,
    https: settings.devServerConfig.https(),
    headers: { "Access-Control-Allow-Origin": "*" },
    overlay: true,
    compress: true,

    contentBase: path.resolve(__dirname, settings.paths.templates),
    watchContentBase: true,

    proxy: {
      "/": {
        index: "",
        context: () => true,
        target: settings.devServerConfig.proxy(),
        publicPath: settings.devServerConfig.public(),
        secure: false,
        changeOrigin: true,
        xfwd: true,
      },
    },
  };
};

// Configure the Postcss loader
const configurePostcssLoader = () => {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: "style-loader",
      },
    ],
  };
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    publicPath: settings.devServerConfig.public(),
  },
  devServer: configureDevServer(),
  module: {
    rules: [configurePostcssLoader()],
  },
};

// Development module exports
module.exports = merge.strategy({
  "module.rules": "prepend",
})(commonConfig, devConfig);
