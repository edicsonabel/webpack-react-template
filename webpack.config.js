const path = require("path");
const folderBuild = "docs";
const ASSET_PATH = process.env.ASSET_PATH || "public";
const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require("webpack");

const isDev = () => process.env.WEBPACK_DEV_SERVER

const dotbabelrc = {
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
  },
};

const doteslintrc = {
  loader: "eslint-loader",
  options: {
    parser: "babel-eslint",
    rules: {
      // 'no-console':'warn'
    },
    plugins: ["react"],
    extends: ["eslint:recommend", ["plugin:react/recommend"]],
    env: {
      browser: true,
      node: true,
    },
  },
};

const styleLoader = {
  test: /\.s[ac]ss$/i,
  use: [
    /*MiniCssExtractPlugin.loader*/ "style-loader",
    "css-loader",
    "sass-loader",
  ],
};

const copyPublicPath = () => {
  let result = new FileManagerPlugin({
  onStart: {
    copy: [
      {
        source: `${ASSET_PATH}/*`,
        destination: `${folderBuild}`,
      },
    ],
  }
})
result = !isDev() ? result : null;
return result
;}

let webpackConfig = {

  entry: path.resolve(__dirname, "src/index.js"),

  output: {
    path: path.resolve(__dirname, folderBuild),
    /* publicPath: ASSET_PATH, */
    filename: "[name].bundle.js",
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  resolve: {
    extensions: [".js", "jsx"],
  },

  module: {
    rules: [
      styleLoader,
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [dotbabelrc, doteslintrc],
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, folderBuild),
    hot: true,
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/index.html"),
      favicon: `${ASSET_PATH}/favicon.svg`,
    }),

    new HotModuleReplacementPlugin(),
  ],
};

webpackConfig.mode = "development";

if( !isDev() ){
  webpackConfig.plugins.push(copyPublicPath());
  webpackConfig.mode = "production";
}

module.exports = webpackConfig  