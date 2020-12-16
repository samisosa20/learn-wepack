// Node modules
const path = require("path");

// Webpack plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

// Config files
const pkg = require("./package.json");
const settings = require("./webpack.settings.js");

// Configure Entries
const configureEntries = () => {
  let entries = {};
  for (const [key, value] of Object.entries(settings.entries)) {
    entries[key] = path.resolve(
      __dirname,
      settings.paths.src.js + value
    );
  }
  return entries;
};

// Configure Clean webpack
const configureCleanWebpack = () => {
  return {
    cleanOnceBeforeBuildPatterns: ["**/*"],
    verbose: true,
    dry: false,
  };
};

// Configure Babel loader
const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: [/(node_modules)/],
    use: [
      {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "current",
                  ie: "11",
                },
                modules: false,
                corejs: {
                  version: 2,
                  proposals: true,
                },
                useBuiltIns: "entry",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-runtime",
          ],
        },
      },
      "eslint-loader",
    ],
  };
};

// Configure the Postcss loader
const configurePostcssLoader = () => {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: { sourceMap: true },
      },
    ],
  };
};

// Configure Font loader
const configureFontLoader = () => {
  return {
    test: /\.(ttf|eot|woff|woff2?)$/i,
    exclude: /img/,
    loader: "url-loader",
    options: {
      limit: 5000,
      name: "fonts/[name].[ext]?[contenthash:4]",
    },
  };
};

// Configure Image loader
const configureImageLoader = () => {
  return {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    loader: "file-loader",
    options: {
      name: "img/[name].[ext]?[contenthash:4]",
    },
  };
};

// Configure Manifest
const configureManifest = (fileName) => {
  return {
    fileName: fileName,
    basePath: settings.manifestConfig.basePath,
    map: (file) => {
      file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, "$2");
      return file;
    },
  };
};

// Common module exports
module.exports = {
  name: pkg.name,
  entry: configureEntries(),
  output: {
    filename: path.join("./js", "[name].bundle.js"),
    path: path.resolve(__dirname, settings.paths.dist.base),
    publicPath: settings.urls.publicPath(),
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "."),
    },
  },
  externals: {
    jquery: "jQuery",
    Drupal: "Drupal",
    drupalSettings: "drupalSettings",
  },
  module: {
    rules: [
      configurePostcssLoader(),
      configureBabelLoader(),
      configureFontLoader(),
      configureImageLoader(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(configureCleanWebpack()),
    new CopyWebpackPlugin(settings.copyWebpackConfig),
    new ManifestPlugin(configureManifest("manifest.json")),
    new WebpackBuildNotifierPlugin({
      sound: "Funk",
      successSound: "Pop",
    }),
  ],
};
