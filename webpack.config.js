const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: 'production',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
      new CopyWebpackPlugin({
          patterns: [
              { from: path.join(__dirname, 'src', 'img') },
              { from: path.join(__dirname, 'src', 'popup') },
              { from: path.join(__dirname, 'src') + "/manifest.json" },
              { from: path.join(__dirname, 'src', 'main', 'utils') + "/jquery-3.3.1.js" }
          ]
      })
  ]
};
