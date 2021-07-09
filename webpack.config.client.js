const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
  name: "browser",
  // Sets process.env.NODE.ENV to value. Defaults to production.
  mode: "development",
  // Specifies how source maps are generated.
  // Source maps are a way of mapping code from a compressed file.
  devtool: 'eval-source-map',
  // Specifies where webpack starts bundling code.
  entry: [
    'webpack-hot-middleware/client?reload=true', path.join(CURRENT_WORKING_DIR, 'client/main.js')
  ],
  // The output path for the bundled code
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    // All public assest in app
    publicPath: '/dist/'
  },
  // Sets regex rule for which file is used in transpilation. 
  module: {
    rules: [
      {
        test: /\jsx?$/,
        exclude: /node_modules/,
        // This is the transpilation tool
        use: ['babel-loader']
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

module.exports = config





