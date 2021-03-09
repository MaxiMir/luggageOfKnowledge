#### Семантическое версионирование: ####
semver.org/lang/ru

#### Устанавливаем глобально npm 5 версии: ####
```shell
sudo npm install npm@5 -g
```
#### Устанавливаем глобально последнюю версию npm: ####
```shell
sudo npm install npm@latest -g
```
#### Окно помощи: ####
```shell
npm help
```
#### Помощь по конкретной команде: ####
```shell
npm install -h
```
#### Полная информация по npm: ####
```shell
npm help npm
```
#### Развернутый гайд по всем командам: ####
```shell
npm -l
```
#### Поиск пакетов связанных с jQuery: ####
```shell
npm search jquery
```
#### Установка пакетов (-g - глобально): ####
```shell 
npm i -g install http-server
```
#### Установка нескольких пакетов: ####
```shell
npm install normalize.css bootstrap
```
#### Посмотреть глобально установленные пакеты (=0 - без зависимостей): ####
```shell
npm ls -g --depth=0
```
#### Удаление пакета (без зависимостей): ####
```shell
npm uninstall jquery
```
#### Инициализация: ####
```shell
npm init
```
#### Быстрая инициализация (yes на вопросы): ####
```shell
npm init -y
```

#### Удаление пакетов с зависимостями (т.к есть package.json): ####
```shell
npm uninstall webpack
```
#### Обновление пакета (@latest - до последней): ####
```shell
npm update jquery
```

#### Узнать какие пакеты нуждаются в обновлении ####
```shell
npm outdated
```

#### Обновить до wanted версии: ####
```shell
npm update
```
#### Установить + зависимость в devDependencies: ####
```shell
$ npm install gulp -D
```

#### Подключаем модуль (jquery): ####
```shell
npm install -D webpack@latest webpack-cli
```

> Создаем папку /dist - в ней будут файлы необходимые для запуска сайта в браузере

> Создаем папку /src - в ней будут файлы-исходники ####

> В /dist создаем файл index.html: ####


```html
<head>
    ...
    <script src="main.js"></script>
    ...
</head>
```

> В /src создаем файл index.js:
```javascript
$ = require('jquery');
``` 

> npx - запуск исполняемых файлов, входящих в состав npm пакетов:
```shell
npx webpack
```

> Запускаем в консоли webpack не устанавливая его глобально
+ склеит index.js и jquery.js
+ минифицирует
+ сделает читабельным для браузера
+ сохранит в dist/main.js


#### npm-скрипты: ####
- тестирование приложения
- сборку приложения на продакшен
- локальный сервер для разрабоки
- любые зависимости вашего приложения с различными опциями
comment

> Создаем src/scss/main.scss + устанавливаем node-sass:
```shell
npm i node-sass -D
```

#### Пример запуска node-sass: ####
```shell
node-sass --output-style compressed -o dist/css src/scss
```
node-sass установлен локально, так что вызывать можно либо через npx либо при помощи node-скриптов
--output-style - вид скопилированных стилей
compressed - стили сжимаются
скомпилированные файлы выводятся в -o dist/css
в src/scss идет поиск файлов .scss для компиляции
