const path = require('path')

path.basename(__filename) // название файла -> path.ref.js
path.dirname(__filename) // название директории /Users/.../refs/path.ref.js
path.extname(__filename) // расширение файла -> .js
path.parse(__filename) // объект с информацией о файле ->
{
  root: '/',
  dir: '/Users/.../refs/path.ref.js'
  base: 'path.ref.js',
  ext: '.js',
  name: 'path.ref'
}

path.join(__dirname, '..', 'test', 'second.html') // склеивает пути
path.resolve(__dirname, '..', 'test', '/second.html') // делает КОРРЕКТНЫЙ путь -> /second.html
