$ npm init

$ npm install -D webpack webpack-cli     # -D - зависимость для разрабоки (<-> --save-dev)

$ npm install -D html-webpack-plugin     # плагин для взаимодействия с html
$ npm install -D clean-webpack-plugin    # плагин для очистки старых сбилженных файлов

$ npm install -D style-loader css-loader # плагины для работы с css файлами
$ npm i -D less less-loader              # плагин препроцессора less и плагин для работы с less файлами
$ npm i -D node-sass sass-loader         # плагин препроцессора sass и плагин для работы с sass файлами
$ npm install normalize.css              # нормализация css
$ npm install --save-dev mini-css-extract-plugin # плагин для выноса css в файлы (вместо <style> в <head>)

$ npm install -D file-loader             # плагин для работы с файлами
$ npm install -D xml-loader              # плагин для работы с xml
$ npm install -D csv-loader              # плагин для работы с csv
$ npm install -D papaparse               # зависимость для csv плагина

$ npm install -D copy-webpack-plugin    # плагин для копирования файлов

$ npm i -S jquery                        # -S (по умолч. зависимость для приложения)

$ npm install -D webpack-dev-server      # пакет подключает devserver

$ npm i -D cross-env                     # пакет для установки переменных окружения

$ npm install --save-dev terser-webpack-plugin             # пакет для минификации JS
$ npm install --save-dev optimize-css-assets-webpack-plugin # пакет для минификации CSS

$ npm install -D babel-loader @babel/core @babel-preset-env @babel/polyfill # установка babel, eго ядра, пресета и полифиллов
$ npm install -D @babel/plugin-proposal-class-properties                    # плагин для работы со свойствами класса (опциональный)
$ npm install -D @babel/preset-typescript                                   # preset для typescript

$ npm i react react-dom
$ npm i -D @babel/preset-react preset для react

$ npm i -D eslint eslint-loader
$ npm i -D babel-eslint

$ npm i lodash

$ npm i -D webpack-bundle-analyzer # для анализа и оптимизации проекта


$ npm run dev # без минификации
$ npm run build # c минификацией
$ npm run watch
$ npm run start
$ npm run stats
