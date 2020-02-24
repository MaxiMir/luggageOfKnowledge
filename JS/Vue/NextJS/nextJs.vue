/**
+ Extension for VSC: Vetur
npm (current version)

В ядро Nuxt входит Vue и Vuex

$ sudo npm i -g create-nuxt-app # для разворачивания приложений на next
$ npm install bootstrap # фрейморк UI

$ cd Documents/projects/
$ create-nuxt-app nuxt-theory # инициализация проекта
$ ? Use a custom server framework: none
$ ? Choose features to install: enter
$ ? Use a custom UI framework: none
$ ? Use a custom test framework: none
$ ? Choose rendering mode: Universal
$ ? Choose a package manager: npm

cd nuxt-theory/
$ npm run dev # запуск генерации проекта
*/

// FILE: package.json:
{
    "scripts": {
        "dev": "nuxt", // запуск приложения
        "build": "nuxt build", // билд продакш приложения
        "start": "nuxt start", // запуск сбилженной версии и чтобы она работала (запуск сервера и клиента)
        "generate": "nuxt generate" // генерация статических страниц в билде (если SPA)
    }    
}

// FOLDER: next - системная папка
// FOLDER: assets - нескомпилированные файлы (LESS, SASS, JS)
// FOLDER: components - компоненты
// FOLDER: layouts - 
// FOLDER: middleware -
// FOLDER: node_modules - зависимости
// FOLDER: pages - 
// FOLDER: plugins - плагины
// FOLDER: static - статические элементы приложения (доступны через /)
// FOLDER: store - реализовывается Vuex

// FILE: nuxt.config.js - конфигурация Nuxt приложения
module.exports = {
    mode: 'universal', // SSR (Service Site Rendering)
    /**
     ** Headers of the page 
     */
    head: {
        title: 'Hello NuxtJS', // Title для страницы index.html,
        link: [
            { rel: 'icon', type: 'imagex-icon', href: 'favicon.ico' } // favicon из static
        ]
    },

    /**
     * Global CSS
     */
    css: [
        '@/node_modules/bootstrap/dist/css/bootstrap.min.css' // подключаем bootstrap. (после этого npm run dev)
    ]
    
}

// @ @@ ~ ~~ # корень приложения


// + FILE: /components/Navbar.vue:
<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">NuxtJS</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Users</a>
                    </li>
                </ul>    
            </div>
        </nav>
    </header>
</template>


// FILE: /layouts/default.vue:
<template>
    <div>
        <Navbar />
        <main>
            <div class="container">
                <nuxt />
            </div>
        </main>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';

    export default {
        components: {
            Navbar // регистрируем для использования компонент
        }        
    }
</script>


// FILE: /pages/index.vue:
<template>
    <section>
        <h1>This is home page</h1>
    </section>
</template> 

<script>

</script>

<style>

</style>
