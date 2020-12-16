// Node modules
const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const git = require("git-rev-sync");
const moment = require("moment");

// Webpack plugins
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Config files
const commonConfig = require("./webpack.common.js");
const settings = require("./webpack.settings.js");
const pkg = require("./package.json");

// Configure file banner
const configureBanner = () => {
  return {
    banner: [
      "/*!",
      " * @project        " + pkg.name,
      " * @name           " + "[filebase]",
      " * @author         " + pkg.author.name,
      " * @build          " + moment().format("llll") + " ET",
      " * @release        " + git.long() + " [" + git.branch() + "]",
      " * @copyright      Copyright (c) " +
        moment().format("YYYY") +
        " " +
        pkg.author.name,
      " *",
      " */",
      "",
    ].join("\n"),
    raw: true,
  };
};

// Configure the Postcss loader
const configurePostcssLoader = () => {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
    ],
  };
};

// Configure optimization
const configureOptimization = () => {
  return {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
          safe: true,
          discardComments: true,
        },
      }),
      new TerserPlugin(configureTerser()),
    ],
  };
};

// Configure terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true,
  };
};

const prodConfig = {
  mode: "production",
  optimization: configureOptimization(),
  output: {
    publicPath: settings.devServerConfig.public(),
  },
  module: {
    rules: [configurePostcssLoader()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, settings.paths.dist.base),
      filename: path.join("./css", "[name].css?[contenthash:4]"),
    }),
    new webpack.BannerPlugin(configureBanner()),
  ],
};

// Production module exports
module.exports = merge.strategy({
  "module.rules": "prepend",
})(commonConfig, prodConfig);
