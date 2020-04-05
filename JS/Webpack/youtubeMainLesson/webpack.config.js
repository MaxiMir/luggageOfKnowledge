// Дефолтные расширения - js и json.

// $ export NODE_ENV=development # ubuntu, macos - установить переменную окружения NODE_ENV в true на текущем сеансе операционной системы)


const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all' // оптимизация (например, подключение одной и той же библиотеки в нескольких файлах - код библиотеки будет вынесен в отдельный файл)
    }
  }

  if (isProd) { // минификация
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader, // MiniCssExtractPlugin - добавляет стили в <head> в ОТДЕЛЬНЫЙ ФАЙЛ
      options: {
        hmr: isDev, // hot module replacement - изменение сущностей без перезагрузки страницы (если это возможно)
        reloadAll: true
      },
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}


const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  const base = [ // массив с плагинами
    new HTMLWebpackPlugin({
      filename: 'index.html', // создаст index.html и подключит все скрипты
      // или:
      template: './index.html', // плагин возмет index.html за основу и подключит все скрипты
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'), // откуда копируем
        to: path.resolve(__dirname, 'dist') // куда копируем
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css') // выходной файл
    })
  ]

  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }

  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'), // папка с исходниками (src можно не указывать в путях в других настройках)
  mode: 'development', // mode по умолчанию (не минифированная версия у JS файлов)
  entry: './index.js', // путь до входного файла приложения
  entry: { // или 2 точки входа:
    main: ['@babel/polyfill', './index.js'], // при сборке использовать полифиллы
    analitics: './analytics.ts'
  },
  entry: { // или для REACT:
    main: ['@babel/polyfill', './index.jsx'],
    analitics: './analytics.ts'
  },
  output: { // куда складывать результаты выполнения webpack-ом
    filename: filename('js'), // название результирующего файла. Паттерн - название файла.[contenthash] - хэш исходя из содержимого файла . hash - хэш
    path: path.resolve(__dirname, 'dist') // конечная директория для результирующих файлов
  },
  resolve: {
    extensions: ['.js', '.json', '.png'], // какие расширения считать по умолчанию
    alias: { // создание алиасов для импортов
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  devServer: { // настройки пакета webpack-dev-server
    port: 4200,
    hot: isDev // <-> hot module replacement
  },
  devtool: isDev ? 'source-map' : '', // добавление исходных карт (возможность просмотривать исходный в браузере и в ФС)
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/, // регулярка для выборки файлов
        use: ['style-loader', 'css-loader'], // используемые loader(ы) (webpack идет справа-налево)
        // css-loader - добавляет возможность импортов css файлов в js файлах
        // style-loader - обрачивает стили в <style> и добавляет в <head>

        // или:
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // исключаем папку node_modules
        use: jsLoaders()
      },
      {
        test: /\.ts$/, // файлы typescript
        exclude: /node_modules/, // исключаем папку node_modules
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/, // файлы react
        exclude: /node_modules/, // исключаем папку node_modules
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      }
    ]
  }
}
