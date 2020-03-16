// Название этого файла должно совпадать с entry point в package.json


// (function(require, modulem exports, __filename, __dirname) {
const obj = require('./user') // импортируем файл user.js

obj.sayHello()


__dirname // текущая папка (абсолютный путь)
__filename // текущий файл (абсолютный путь)

// })()
