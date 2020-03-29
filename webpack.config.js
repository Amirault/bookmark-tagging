const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./app/chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

module.exports = {
  entry: path.resolve(__dirname, "app") + "/js/app.js",
  mode: "development",
  resolve: {
    modules: ["app/js", "node_modules"],
    alias: {
      lib: "app/js/lib",
      data: "app/js/data",
      view: "app/js/view",
      extension: "app/js/extension"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Output Management",
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000"
      },
      manifest: "manifest.json",
      filename: "index.html",
      template: "./app/static/index.html",
      hash: true
    }),
    new CopyPlugin([
      {
        from: "./app/chrome/icons",
        to: "icons"
      },
      {
        from: "./app/static/css",
        to: "css"
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    })
  ]
};
