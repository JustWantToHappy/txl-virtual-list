const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const config = {
  mode: "development",
  entry: path.join(__dirname, "./src/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: 'umd',
    library: 'txl-virtual-list'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'build')]
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.js(x?))|(\.ts(x?))$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
};


module.exports = config;