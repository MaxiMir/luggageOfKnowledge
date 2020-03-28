# Семантическое версионирование:
$ semver.org/lang/ru

# Устанавливаем глобально npm 5 версии:
$ sudo npm install npm@5 -g

# Устанавливаем глобально последнюю версию npm:
$ sudo npm install npm@latest -g

# окно помощи:
$ npm help

# помощь по конкретной команде:
$ npm install -h

# полная информация по npm:
$ npm help npm

# развернутый гайд по всем командам:
$ npm -l

# поиск пакетов связанных с jQuery:
$ npm search jquery

# установка пакетов (-g - глобально):
$ npm i -g install http-server

# установка нескольких пакетов:
$ npm install normalize.css bootstrap

# посмотреть глобально установленные пакеты (=0 - без зависимостей):
$ npm ls -g --depth=0

# удаление пакета (без зависимостей):
$ npm uninstall jquery

# инициализация:
$ npm init

# быстрая инициализация (yes на вопросы):
$ npm init -y

$ cat package.json # =>
{
    "name": "my-app", # название Dev
    "version": "my-app", # обязательно 3 цифры Dev
    "description": "", # описание Dev
    "main": "index.js", # точка входа +
    "dependencies": { # зависимости для продакшена +
        "webpack": "^4.28.4"
    },
    "devDependencies": {}, # зависимости для разработчика
    "scripts": { # npm cкрипты +
        "start": "node index.js", # как запускать приложение -> npm start
        "test": "mocha test" # как запускать тесты -> npm test
        "blabla": "blabla --option"
        "scss": "node-sass --output-style compressed -o dist/css src/scss" # кастомные -> npm run scss
        "build": "webpack --output dist/bundle.js" # кастомные -> npm run build
    },
    "keywords": "", # ключевые слова для поиска текущего пакета Dev
    "author": "", # автор Dev
    "license": "ISC" # лицензия Dev
}

# удаление пакетов с зависимостями (т.к есть package.json):
$ npm uninstall webpack

# обновление пакета (@latest - до последней):
$ npm update jquery

# узнать какие пакеты нуждаются в обновлении
$ npm outdated

# обновить до wanted версии:
$ npm update

# установить + зависимость в devDependencies:
$ npm install gulp -D

# подключаем модуль (jquery):
$ npm install -D webpack@latest webpack-cli

# Создаем папку /dist - в ней будут файлы необходимые для запуска сайта в браузере
# Создаем папку /src - в ней будут файлы-исходники
# В /dist создаем файл index.html:
:<<comment
<head>
    ...
    <script src="main.js"></script>
    ...
</head>
comment

# В /src создаем файл index.js:
$ = require('jquery');

# npx - запуск исполняемых файлов, входящих в состав npm пакетов:
$ npx webpack # запускаем в консоли webpack не устанавливая его глобально

:<<comment
+ склеит index.js и jquery.js
+ минифицирует
+ сделает читабельным для браузера
+ сохранит в dist/main.js
comment



# npm-скрипты:
:<<comment
- тестирование приложения
- сборку приложения на продакшен
- локальный сервер для разрабоки
- любые зависимости вашего приложения с различными опциями
comment

# Создаем src/scss/main.scss + устанавливаем node-sass:
npm i node-sass -D

# Пример запуска node-sass:
node-sass --output-style compressed -o dist/css src/scss
# node-sass установлен локально, так что вызывать можно либо через npx либо при помощи node-скриптов
# --output-style - вид скопилированных стилей
# compressed - стили сжимаются
# скомпилированные файлы выводятся в -o dist/css
# в src/scss идет поиск файлов .scss для компиляции
