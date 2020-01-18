// URL: https://github.com/vladilenm/webpack-2020

// WITHOUNT Webpack:

// + FILE /webpack/index.html:
/**
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Webpack</title>
 <script src="analitics.js"></script>
 </head>
 <body>
 <div class="container">
 <h1>Webpack Container</h1>
 </div>
 <script src="Post.js"></script>
 <script src="index.js"></script>
 </body>
 </html>
 */



// + FILE /webpack/Post.js:
class Post {
  constructor(title) {
    this.title = title;
    this.date = new Date();
  }
  
  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON(),
    });
  }
}



// + FILE /webpack/index.js:
const post = new Post("Webpack Post title");

console.log("title", post.toString());



// + FILE /webpack/analitics.js:
function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;
  
  const listener = () => counter++;
  
  document.addEventListener('click', listener);
  
  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed";
      }
      
      return counter;
    }
  }
}

window.analytics = createAnalytics();


// WITH Webpack:

// Дефолтные расширения - js и json.


// + FOLDER /webpack/dist/
// + FOLDER /webpack/src/styles/
// + FOLDER /webpack/src/assets/
// + FOLDER /webpack/src/assets/fonts
// + FOLDER /webpack/src/:
// MOVE TO -> /webpack/src/:
// analitics.js
// index.js
// Post.js
// index.html


// $ npm init

// $ npm install -D webpack webpack-cli // -D - зависимость для разрабоки

// $ npm install -D html-webpack-plugin // плагин для взаимодействия с html
// $ npm install -D clean-webpack-plugin // плагин для очистки

// $ npm install -D style-loader css-loader // плагины для работы с css файлами
// $ npm i -D less less-loader // плагин препроцессора less и плагин для работы с less файлами
// $ npm i -D node-sass sass-loader // плагин препроцессора sass и плагин для работы с sass файлами
// $ npm install -D file-loader // плагин для работы с файлами
// $ npm install normalize.css // нормализация css
// $ npm install -D xml-loader // плагин для работы с xml
// $ npm install -D csv-loader // плагин для работы с csv
// $ npm install -D papaparse // зависимость для csv плагина
//  $ npm install -D copy-webpack-plugin // плагин для копирования файлов
// $ npm install --save-dev mini-css-extract-plugin // --save-dev <-> -D плагин для выноса css в файлы (вместо <style> в <head>)

// $ npm i -S jquery // -S (по умолч. зависимость для приложения)

// $ npm install -D webpack-dev-server // пакет подключает devserver

// $ npm i -D cross-env // пакет для установки переменных окружения

// $ npm install --save-dev terser-webpack-plugin // пакет для минификации JS

// $ npm install --save-dev optimize-css-assets-webpack-plugin // пакет для минификации CSS

// $ npm install -D babel-loader @babel/core @babel-preset-env @babel/polyfill // установка babel, eго ядра, пресета и полифиллов
// $ npm install -D @babel/plugin-proposal-class-properties // плагин для работы со свойствами класса (опциональный)
// $ npm install -D @babel/preset-typescript // preset для typescript 

// $ npm i react react-dom
// $ npm i -D @babel/preset-react // preset для react 

// $ npm i -D eslint eslint-loader 
// $ npm i -D babel-eslint

// $ npm i lodash

// $ npm i -D webpack-bundle-analyzer // для анализа и оптимизации проекта 



// + FILE: /webpack/.eslintrc:
{
  'parsers': 'babel-eslint', // указываем, что работаем с парсером babel-eslint
    'rules': {
  'no-unused-vars': 'warn'
},
  'env': {
  'es6': true,
      'browser': true, // указываем, что работаем в браузере
},
  'extends': [
  'eslint:recommended'
]
}



// + FILE: /webpack/src/assets/json.json:
{
  title: "I am JSON title"
}



// + FILE: /webpack/src/assets/data.xml:
/**
 <?xml version="1.0" encoding="UTF-8">
 <email>
 <to>Maximir</to>
 <from>Webpack</from>
 <heading>Tutorial</heading>
 <body>Finish the record</body>
 </email>
 */



// + FILE: /webpack/src/assets/data.csv:




// + FILE: /webpack/src/assets/logo.png



// + FILE: /webpack/src/assets/favicon.ico



// + FILE: /webpack/src/assets/fonts/Roboto-Regular.ttf



// FILE: /webpack/src/index.html:
/**
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <link rel="icon" href="favicon.ico" type="image/ico">
 <title>Webpack</title>
 </head>
 <body>
 
 <div class="container">
 <h1>Webpack Container</h1>
 
 <hr>
 
 <div class="logo"></div>
 
 <pre></pre>
 
 <hr>
 
 <div class="box">
 <h2>Less</h2>
 </div>
 </div>
 </body>
 </html>
 */



// + FILE /webpack/src/styles/styles.css:
/**
 @import "~normalize.css"; // ~ для пакетов из node_modules
 @import "roboto.css";
 
 body {
  font-family: 'Roboto', sans-serif;
}
 
 .container {
  padding-top: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
 
 h1 {
  text-align: center;
}
 
 .logo {
  background-image: url('../assets/logo.png');
  background-size: cover;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
 */

// + FILE /webpack/src/styles/less.less:
/**
 @border: 1px solid #ccc;
 
 .box {
  padding: 1rem;
  border-radius: 5px;
  mt-top: 1rem;
  border: @border;

  h2 {
    text-align: center;
    color: darkblue;
  }
}
 */

// + FILE: /webpack/src/assets/fonts/roboto.css:
/**
 @font-fase {
  font-family: 'Roboto';
  src: url('../assets/fonts/Roboto-Regular.ttf) format('truetype);
}
 */



// FILE: /webpack/src/Post.js:
export default class Post {
  constructor(title, img) {
    this.title = title;
    this.img = img;
    this.date = new Date();
  }
  
  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON(),
      img: this.img
    }, null, 2);
  }
}

// RENAME FILE /webpack/src/analitics.js -> /webpack/src/analitics.ts
// FILE /webpack/src/analitics.js:
import * as from 'jquery';

function createAnalytics():object {
  let counter = 0;
  let isDestroyed: boolean = false;
  
  const listener = (): number => counter++;
  
  document.addEventListener('click', listener);
  
  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed";
      }
      
      return counter;
    }
  }
}

window['analytics'] = createAnalytics();
async function start() {
  return await Promise.resolve('async is working')
}

start().then(console.log);

const unused = 42;

class Util {
  static id = Date.now();
}

console.log('Util Id:', Util.id);
console.log(unused);

import('lodash').then(_ => { // динамический import в webpack (lazyload)
  console.log('Lodash', _.random(0, 42, true))
});



// + FILE /webpack/src/features.js:

// FILE: /webpack/src/index.js:
import * as $ from 'jquery'; // импорт jquery
import Post from './Post';
import json from './assets/json' // импорт json файла (для .json расширение можно не указывать)
import logo from './assets/logo.png'; // импорт картинки
import xml from '@/assets/data.xml' // импорт xml файла c использованием алиаса
import csv from '@/assets/data.csv' // импорт csv файла
import './features';
import './styles/styles.css';
import './styles/less.less';

const post = new Post("Webpack Post title", logo);

$('pre').html(post.toString());

console.log('title:', post.toString());
console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);



// + FILE /webpack/src/webpack.config.js:
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');


const isDev = proccess.env.NODE_ENV === 'development';

const getOptimizationSettings = () => {
  const config = {
    splitChunks: {
      chunks: 'all' // оптимизация (например, подключение одной и той же библиотеки в нескольких файлах - код библиотеки будет вынесен в отдельный файл)
    }
  };
  
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  
  return config;
}

const getFilename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const getCssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev, // hot module replacement - изменение сущностей перез перезагрузки страницы (если это возможно)
        reloadAll: true
      }
    },
    'css-loader'
  ];
  
  if (extra) {
    loaders.push(extra);
  }
  
  return loaders;
  
  // MiniCssExtractPlugin - добавляет стили в <head> в отдельный файл
};

const getBabelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
  
  if (preset) {
    options.presets.push(preset);
  }
  
  return opts;
};

const getJsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: getBabelOptions()
  }];
  
  if (isDev) {
    loaders.push('eslint-loader');
  }
  
  return loaders;
};


const getPlugins = () => {
  const base = [ // массив с плагинами
    new HTMLWebpackPlugin({
      template: "./index.html", // путь до шаблона
      minify: {
        collapseWhitespace: !isDev
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
      filename: getFilename('css'),
    }),
  ];
  
  return base;
}

// $ export NODE_ENV=development // ubuntu, macos - установить переменную окружения NODE_ENV в true на текущем сеансе операционной системы)


module.exports = {
  context: path(__dirname, 'src'), // папка с исходниками (src можно не указывать в путях в других настройках)
  mode: 'development', // mode по умолчанию (не минифированная версия у bundle.js)
  entry: './index.js', // путь до входного файла приложения
  entry: { // или 2 точки входа:
    main: ['@babel/polyfill', './index.js'], // при сборке использовать полифиллы
    analitics: './analytics.ts'
  },
  output: { // куда складывать результаты выполнения webpack-ом
    filename: getFilename('js'), // название результирующего файла. Паттерн - название файла.[contenthash] - хэш исходя из содержимого файла . hash - хэш
    path: path.resolve(__dirname, 'dist') // конечная директория для результирующих файлов
  },
  resolve: {
    extensions: ['.js', '.json', '.png'], // какие расширения считать по умолчанию    
    alias: { // создание алиасов для импортов
      '@models': path.resolve(__dir, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: getOptimizationSettings(),
  devServer: { // настройки пакета webpack-dev-server
    port: 4200,
    hot: isDev // <-> hot module replacement
  },
  devtool: !isDev ? '' : 'source-map', // добавление исходных карт (возможность просмотривать исходный в браузере и в ФС)
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/, // ругулярка для выборки файлов
        use: ['style-loader', 'css-loader'], // используемые loader(ы) (webpack идет справа-налево)
        // css-loader - добавляет возможность импортов css файлов в js файлах
        // style-loader - обрачиваем стили в <style> и добавляет в <head>
        
        // или:
        use: getCssLoaders()
      },
      {
        test: /\.less$/,
        use: getCssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: getCssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
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
        test: /\.js/,
        exclude: /node_modules/, // исключаем папку node_modules
        use: getJsLoaders()
      },
      {
        test: /\.ts/, // файлы typescript
        exclude: /node_modules/, // исключаем папку node_modules
        loader: {
          loader: 'babel-loader',
          options: getBabelOptions('@babel/preset-typescript')
        }
      }
      {
        test: /\.jsx/, // файлы react
        exclude: /node_modules/, // исключаем папку node_modules
        loader: {
          loader: 'babel-loader',
          options: getBabelOptions('@babel/preset-react')
        }
      }
    ]
  }
};



// FILE: /webpack/package.json:
{
  // ...
  
  // main: "index.js", // если мы не публикуем данный пакет как npm пакет - эту строчку удаляем и указываем: 
  "private": true, // пакет не нужно публиковать
    "scripts": {
  "dev": "cross-env NODE_ENV=development webpack --mode development", // сборка в режиме разработки
      "build": "cross-env NODE_ENV=production webpack --mode production",
      "watch": "cross-env NODE_ENV=development webpack --mode development --watch", // процесс запускает сборку в случае изменения файлов (необходима перезагрузка страницы в браузере)
      "start": "cross-env NODE_ENV=development webpack-dev-server --mode development --open", // процесс запускает сборку в случае изменения файлов + открывает страницу в браузере (автоматическое обвновление) + складывает в оперативную память - для появления файлов в папке dist - Ctrl+C и например $ npm run dev
      "stats": "webpack --json > stats.json && webpack-bundle-analyzer stats.json"
},
  "browserslist": "> 0.25%, not dead", // настройка для babel
}

// $ npm run dev (без минификации)
// $ npm run build (c минификацией)
// $ npm run watch 
// $ npm run start
// $ npm run stats


// RENAME: /webpack/src/index.js -> /webpack/src/index.jsx:
// FILE: /webpack/src/index.jsx:
import * as $ from 'jquery'; // импорт jquery
import React from 'react';
import {render} from 'react-dom';
import './babel';
import './styles/styles.css';
import './styles/less.less';

const App = () => (
    <div id="container">
    <h1>Webpack Container</h1>
<hr />
<div class="logo" />
    <pre />
    <hr />
    <div class="box">
    <h2>Less</h2>
    </div>
    </div>
);

render(<App />, document.getElementById('app'));


// FILE: /webpack/src/index.html:
/**
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <link rel="icon" href="favicon.ico" type="image/ico">
 <title>Webpack</title>
 </head>
 <body>
 
 <div id="app"></div>
 </body>
 </html>
 */

// FILE /webpack/src/webpack.config.js:
module.exports = {
  // ...
  entry: {
    main: ['@babel/polyfill', './index.jsx'],
    analitics: './analytics.ts'
  }
  // ...
}