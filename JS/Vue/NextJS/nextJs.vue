<script>
/*
По умолчанию nuxt оптимизирует все приложение - оборачивает все страницы в отдельные чанки и отдельно их подгружает (Lazy Loading).


+ Extension for VSC: Vetur
npm (current version)

! В ядро Nuxt входит Vue и Vuex


$ sudo npm i -g create-nuxt-app # для разворачивания приложений на nuxt
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

// FOLDER: nuxt - системная папка
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
     * Customize the progress-bar color    
     */
    loading: { color: 'blue' } // loader

    /**
     * Global CSS
     */
    css: [
        '@/node_modules/bootstrap/dist/css/bootstrap.min.css' // подключаем bootstrap. (после этого $ npm run dev)
    ],

    /**
     * Nuxt.js modules    
     */
    modules: [
        '@nuxtjs./axios' // #1
    ],

    axios: { // #2

    },
}

// @ @@ ~ ~~  # корень приложения

</script>


// + FILE: /components/Navbar.vue:
<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">NuxtJS</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <nuxt-link exact active-class="active" class="nav-link" to="/">Home</nuxt-link>
                    </li>
                    <li class="nav-item">                        
                        <nuxt-link no-prefetch active-class="active" class="nav-link" to="/users">Users</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link active-class="active" class="nav-link" to="/about">About</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link active-class="active" class="nav-link" to="/login">Login</nuxt-link>
                    </li>
                    <!--
                    nuxt-link - ссылка с динамическим режимом (без перезагрузки)
                    active-class="active" - класс для активной ссылки (по умолчанию добавляет класс nuxt-link-active). При этом, добаляет класс и родительскому элементу li

                    exact - полное совпадение URN

                    no-prefetch - страницу подгружает только по запросу(переходу). По дефолту подружает все
                    -->
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
            Navbar // регистрируем компонент
        }        
    }
</script>


// 1 вариант создания страниц - создание файлов в /pages:
// FILE: /pages/index.vue (главная страница) он же `роут`:
<template>
    <section>
        <h1>This is home page</h1>
    </section>
</template> 


<script>
    export default {
            
    }
</script>




// + FILE: /pages/users/index.vue (страница пользователей) он же `роут`:
<template>
    <section>
        <h1>{{pageTitle}}</h1>

        <!-- До asyncData -->
        <ul>
            <li v-for="user of users" :key="user">
                <a href="#" @click.prevent="goTo(user)">
                    User {{user}}
                </a>
            </li>
        </ul>

        <!-- С asyncData -->
        <ul>
            <li v-for="user of users" :key="user.id">
                <a href="#" @click.prevent="goTo(user)">
                    {{ user.name }} ({{ user.email}}>)
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        // nuxt затем совмещает asyncData и data
        asyncData({$axios, error}) { // данные доступны на сервере (nuxt). Из контекста берем модуль $axios и error
            return $axios.$get('https://jsonplaceholder.typicode.com/users')
                .then(users => { users })
                .catch(err => {
                    error(err)
                })
        }, 
        data() { // данные доступны на клиентской стороне
            return {
                pageTitle: 'Users pages',
                users: [ // в примере с asyncData users удаляется
                    1, 2, 3, 4 , 5
                ]
            }
        },
        methods: {
            
            goTo(user) { // переход на страницу юзера

                //  До asyncData:
                this.$router.push(`/users/${user}`);

                //  С asyncData:
                this.$router.push(`/users/${user.id}`);
            }
        }        
    }
</script>


// + FILE: /pages/users/_id.vue (динамическая страница пользователя) nuxt будет передавать во Vue роутер параметр id:
<template>
    <!-- До asyncData: -->
    <h1>UserID: {{ $route.params.id }}</h1> 

    <!-- C asyncData: -->
    <h1>UserName: {{ user.name }}</h1> 
    <hr />
    <b>{{ user.email }}</b>
</template>

<script>
    export default {
        validate({params}) { // валидация nuxt. params - поля из контекста
            console.log(params); // => { id: 32 }

            return /^\d+$/.test(params.id);
            // если возвращается false -> this page could not be found
        },
        async asyncData({params, err, $axios}) { // asyncData поддерживает async
            try {
                const user = $axios.$get(`https://jsonplaceholder.typicode.com/users/${params.id}`);
                return {user};
            } catch(e) {
                error(e);
            }               
        }
    }
</script>




// 2 вариант создания страниц - создание папок:
// + FOLDER: /about
// + FILE: /about/index.vue:
<template>
    <section>
        <h1>About page</h1>
    </section>
</template>



// + FILE: layouts/error.vue (зарезервированное имя для страницы 404):
<template>
    <section>
        <h1>Error 404</h1>
        <next-link to="/">Home</next-link>
    </section>
</template>

<style scoped> /** область видимости только внутри компонента **/
    h1 {
        color: red;
    }

    section {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>



// + FILE: /layouts/empty.vue:
<template>
    <div class="container">
        <nuxt />
        <!-- <nuxt /> - место куда страница будет рендирениться -->
    </div>   
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 5rem;
    }
</style>


// + FILE: /pages/login.vue:
<template>
    <form>
        <h1>Login</h1>
        <div class="form-group">
            <input type="text" class="from-control">
        </div>
        <div class="form-group">
            <input type="password" class="from-control">
        </div>
        <p>
            <nuxt-link to="/">Home</nuxt-link>
        </p>
        <button class="btn btn-primary">Enter</button>
    </form>
</template>

<script>
    export default {
        layout: 'empty' // layout; устанавливаем layout empty.vue (по умолчанию стоит default)
    }
</script>

<style scoped>
    form {
        width: 600px;
    }
</style>


<script>


// @ Модули:
/**
    google: nuxt community awesome nuxt - описание официальных модулей

    Пример находим модуль axios -> setup:

    $ npm install @nuxtjs/axios

    затем прописываем #1, #2 в nuxt.config.js
*/ 



// @ Vuex:

// + FILE: /store/users.js:
export const actions = {
    async fetchUsers() {
        try {
            const users = await this.$axios.$get('https://jsonplaceholder.typicode.com/users/');

            return users;
        } catch (e) {
            throw e;    
        }
        
    },
}


</script>


// CHANGE FILE: /pages/users/index.vue (страница пользователей) он же `роут`:
<template>
    <section>
        <h1>{{pageTitle}}</h1>

        <ul>
            <li v-for="user of users" :key="user.id">
                <a href="#" @click.prevent="goTo(user)">
                    {{ user.name }} ({{ user.email}}>)
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        async asyncData({store, error}) { 
            try {
                const users = await store.dispatch('users/fetchUsers'); // /store/users.js / fetchUsers
                return users;
            } catch (e) {
                error(e);    
            }
        }, 
        data() { // данные доступны на клиентской стороне
            return {
                pageTitle: 'Users pages',
            }
        },
        methods: {
            goTo(user) { 
                this.$router.push(`/users/${user.id}`);
            }
        }        
    }
</script>
