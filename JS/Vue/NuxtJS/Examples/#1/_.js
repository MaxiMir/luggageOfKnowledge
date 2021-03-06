/**
    $ sudo npm i create-nuxt-app -g
    $ cd Documents/projects/
    $ create-nuxt-app nuxt-blog

    ? Project name: nuxt-blog
    ? Project description: My awesome nuxt fullstack blog
    ? Use a custom server framework: express
    ? Choose features to install: Axios
    ? Use a custom UI framework: element-ui
    ? Use a custom test framework: none
    ? Choose rendering mode: Universal (у Single Page App - нет SSR)
    ? Author name: Maxim Minchenko
    ? Choose a package manager: npm

    $ cd nuxt-blog
    $ npm run dev

    URI: nuxtjs.org -> search -> preprocessors
    $ npm install --save-dev node-sass sass-loader  # устанавливаем препроцессор SCSS
    $ npm install vue-markdown # плагин для Markdown
    $ npm install cookie js-cookie # библиотеки для работы с куками (чтение кук|запись+удаление из кук)
    $ npm install jwt-decode # библиотека для декодирования токена
    $ npm install vue-chartjs chart.js --save # библиотека для графиков

    $ npm install @nuxtjs/pwa  # модуль для PWA URI: pwa.nuxtjs.org

    $ npm i nuxt-seo-module # для генерации robots.txt и sitemap.xml
    $ npm i @nuxtjs/redirect-module # для редиректов

    BACKEND:
    
    Service for mongo DB: mlab

    $ npm install body-parser           # пакет для удобного парсинга входящих параметров        
    $ npm i mongoose                    # пакет для работы с mongoDB
    $ npm install bcrypt-nodejs         # пакет для шифрования паролей
    $ npm install jsonwebtoken          # пакет для создания токенов для сессий
    $ npm install passport passport-jwt # защита роутов и поддержка авторизации
    $ npp install multer                # пакет для загрузки файлов
    $ npm install moment                # пакет для работы с датами




    HEROKU:
    Settings -> Config Vars -> Reveal Config Vars
    KEY: NPM_CONFIG_PRODUCTION
    VALUE: false

    KEY: HOST
    VALUE: 0.0.0.0

    KEY: NODE_ENV
    VALUE: production

    KEY: MONGO_URI
    VALUE: mongodb://maximir:q12345@ds239055.mlab.com:39055/nuxt-blog

    KEY: JWT
    VALUE: prodjwtkey

    KEY: BASE_URL
    VALUE: https://nuxt-ssr-blog.herokuapp.com/    # прописываем его в nuxt.config.js в axios
 */

