const path = require("node:path");

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  target: "node",
  mode: "production",
  entry: {
    babel: "./src/index.ts",
  },
  devtool: false,
  output: {
    filename: "[name].cjs",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs", ".cjs"],
    alias: {
      "@babel/code-frame": require.resolve("./stubs/babel-codeframe.mjs"),
      "@babel/helper-compilation-targets": require.resolve(
        "./stubs/helper-compilation-targets.mjs",
      ),
    },
  },
  ignoreWarnings: [/critical dependency:/i],
  node: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-transform-typescript",
            ]
          }
        },
      },
    ],
  },
  optimization: {
    nodeEnv: false,
    moduleIds: "named",
    chunkIds: "named",
    minimizer:
      [
        new TerserPlugin({
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            mangle: false,
          },
        }),
      ]
  },
};
