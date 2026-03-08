const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: { publicPath: "auto" },
  devServer: { port: 3001 },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-react"] },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "productos",
      filename: "remoteEntry.js",
      exposes: { "./ProductList": "./src/ProductList" },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
