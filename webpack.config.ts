import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import "webpack-dev-server"; // from devServer type

import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config: WebpackConfiguration = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    server: {
      type: "https",
      options: {
        key: "cert/server.key",
        cert: "cert/server.cert",
        // ca: "cert/server.ca",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/common/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./assets/images",
          to: "images",
        },
        {
          from: "./vast.xml",
          to: "vast.xml",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({})],
  },
};

export default config;
