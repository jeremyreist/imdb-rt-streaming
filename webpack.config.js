const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  mode: 'production',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { 
        test: /\.tsx?$/,
        loader: "ts-loader" 
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { 
        test: /\.js$/,
        loader: "source-map-loader" 
      },
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
              { from: path.join(__dirname, 'src') + "/manifest.json" }
          ]
      })
  ]
};
