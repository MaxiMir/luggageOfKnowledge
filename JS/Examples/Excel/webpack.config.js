const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // очистка папки build
const HTMLWebpackPlugin = require('html-webpack-plugin') // работа с html шаблоном
const CopyPlugin = require('copy-webpack-plugin') // копирование файлов/директорий
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // возможность подключать файлы со стилями

const isProd = process.env.NODE_ENV === 'production' // <-> cross-env в package.json
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const cssLoaders = () => {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev, // hot reload
        reloadAll: true
      }
    },
    'css-loader',
    'sass-loader'
  ]
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'] // содержит последние фишки JS
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'], // вначале добавляем полифиллы
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isDev ? 'source-map' : false, // добавление source-map
  devServer: { // плагин webpack-dev-server с hot reload (указывается в package.json)
    port: 3000,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders(),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
}
