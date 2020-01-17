// WITHOUNT Webpack:

// + FILE /webpack-course-2020/index.html:
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
 <script src="Post.js"></script>
 <script src="index.js"></script>
 </div>
 </body>
 </html>
 */



// + FILE /webpack-course-2020/Post.js:
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



// + FILE /webpack-course-2020/index.js:
const post = new Post("Webpack Post title");

console.log("title", post.toString());



// + FILE /webpack-course-2020/analitics.js:
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
// + FOLDER /dist/
// + FOLDER /webpack-course-2020/src/:
// MOVE TO -> /webpack-course-2020/src/:
  // analitics.js
  // index.js
  // Post.js
  // index.html


// $ npm init
// $ npm install -D webpack webpack-cli // -D - зависимость для разрабоки
// $ npm install -D html-webpack-plugin // плагин для взаимодействия с html
// $ npm install -D clean-webpack-plugin // плагин для очистки



// FILE: /webpack-course-2020/src/Post.js:
export default class Post {
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



// FILE: /webpack-course-2020/src/index.js:
import Post from './Post';

const post = new Post("Webpack Post title");

console.log("title", post.toString());



// + FILE /webpack-course-2020/src/webpack.config.js:
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // mode по умолчанию (не минифированная версия у bundle.js)
  entry: './src/index.js', // путь до входного файла приложения
  entry: { // или 2 точки входа:
    main: './src/index.js',
    analitics: './src/analytics.js'
  },
  output: { // куда складывать результаты выполнения webpack-ом
    filename: '[name].bundle.js', // навзвание результирующего файла. Паттерн - название файла.[contenthash] - хэш исходя из содержимого файла
    path: path.resolve(__dirname, 'dist') // конечная директория для результирующих файлов
  },
  plugin: [ // массив с плагинами
    new HTMLWebpackPlugin({
      template: "./src/index.html" // путь до шаблона
    })
  ]
};


// FILE: /webpack-course-2020/src/index.html:
/**
 <!DOCTYPE html>
 <html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webpack</title>
 </head>
 <body>

  <div class="container">
    <h1>Webpack Container</h1>
  </div>

 </body>
 </html>
 */

// $ webpack

