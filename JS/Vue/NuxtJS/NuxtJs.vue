<script>
/*
По умолчанию nuxt оптимизирует все приложение - оборачивает все страницы в отдельные чанки и отдельно их подгружает (Lazy Loading).

Преимущества NuxtJS:

SEO-ОПТИМИЗИАЦИЯ. Если вам необходима высокая результативность SEO, то вам стоит попробовать этот вспомогательный фреймворк. SSR-приложение отправляет визуализированный HTML в качестве ответа на запрос браузера для каждого роута, поэтому поисковики увидят уже наполненную контентом страницу.

РЕШАЕТ ПРОБЛЕМУ СЛОЖНОСТИ. Создание универсальных сервисов может быть сложным и утомительным. Nuxt позволяет легко обмениваться кодом между клиентом и сервером, чтобы вы могли сосредоточиться на логике вашего приложения.

ПРОСТОЕ СОЗДАНИЕ УНИВЕРСАЛЬНЫХ ПРИЛОЖЕНИЙ. Одно из главных достоинств Nuxt.js заключается в том, что фреймворк облегчает создание универсальных приложений. Последние написаны на JavaScript, причем скрипты используются как на стороне клиента, так и на стороне сервера.

ВСЕ ПРЕИМУЩЕСТВА ОДНОСТРАНИЧНЫХ ПРИЛОЖЕНИЙ. Vue нацелен на создание одностраничников. У SPA есть много преимуществ по сравнению с традиционным веб-сайтом. Например, вы можете создать очень высокоскоростной пользовательский интерфейс, который быстро обновляется.

БЫСТРОЕ ВРЕМЯ ЗАГРУЗКИ SPA. Вместо пустой страницы index.html вы предварительно загружаете свое творение на веб-сервер. Также отправляете визуализированный HTML в качестве ответа на запрос браузера для каждого роута. Это существенно увеличивает скорость загрузки.

СТАТИЧЕСКИЙ РЕНДЕРИНГ. Nuxt полностью генерирует статическую версию вашего сайта: вы получаете преимущества универсального рендеринга без необходимости в сервере. Вы можете просто разместить свое приложение на страницах GitHub или Amazon S3.

АВТОМАТИЧЕСКОЕ РАЗБИЕНИЕ КОДА. Фреймворк может генерировать статическую версию вашего сайта со специальной конфигурацией Webpack. Для каждого статически генерируемого роута он получает свой собственный файл JavaScript, содержащий только код, необходимый для запуска.

ОТЛИЧНАЯ СТРУКТУРА ПРОЕКТА ПО УМОЛЧАНИЮ. Во многих небольших приложениях Vue вы управляете структурой кода, в лучшем случае, в нескольких файлах. Структура Nuxt.js по умолчанию дает вам отличный старт для организации вашего сервиса в понятной форме.

КОМПИЛЯЦИЯ ES6/ES7 БЕЗ ДОПОЛНИТЕЛЬНОЙ РАБОТЫ. Помимо Webpack, Nuxt.js также поставляется в комплекте с Babel. Последний обрабатывает компиляцию последних версий JavaScript — таких как ES6 и ES7 — в код, который можно запускать в старых браузерах.

АВТОМАТИЧЕСКИ ОБНОВЛЯЕМЫЙ СЕРВЕР ДЛЯ ЛЕГКОЙ РАЗРАБОТКИ. Разработка с Nuxt.js очень проста: он устанавливает автоматическое обновление сервера. Пока вы разрабатываете код и работаете с файлами .vue, Nuxt.js использует конфигурацию Webpack для проверки изменений и компилирует все для вас.





+ Extension for VSC: Vetur
npm (current version)

! В ядро Nuxt входит Vue и Vuex


$ sudo npm i -g create-nuxt-app     # для разворачивания приложений на nuxt
$ npm install bootstrap             # фрейморк UI


$ cd Documents/projects/
$ create-nuxt-app nuxt-theory       # инициализация проекта

$ ? Use a custom server framework: none (Nuxt default server)
$ ? Choose features to install: enter
$ ? Use a custom UI framework: none
$ ? Use a custom test framework: none
$ ? Choose rendering mode: Universal
$ ? Choose a package manager: npm

cd nuxt-theory/
$ npm run dev                       # запуск генерации проекта

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
// FOLDER: layouts
// FOLDER: middleware
// FOLDER: node_modules - зависимости
// FOLDER: pages
// FOLDER: plugins - плагины
// FOLDER: static - статические элементы приложения (доступны через /)
// FOLDER: store - реализовывается Vuex



// FILE: nuxt.config.js - конфигурация Nuxt приложения
module.exports = {
    mode: 'universal', // SSR (Service Site Rendering)
    head: {
        title: 'Hello NuxtJS', // Title для страницы index.html,
        link: [
            { rel: 'icon', type: 'imagex-icon', href: 'favicon.ico' } // favicon из static
        ]
    },
    loading: { color: 'blue' }, // loader при подгрузке данных
    css: [
        '@/node_modules/bootstrap/dist/css/bootstrap.min.css' // подключаем bootstrap. (после этого $ npm run dev)
    ],
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

                    <li class="nav-item" v-if="isAuth"> 
                        <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
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

<script>
    export default {
        computed: {
            isAuth() {
                return this.$store.getters.isAuth;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>



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
                    User: {{user}}
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
        async asyncData({$axios, error}) { // данные доступны на сервере (nuxt). Из контекста берем модуль $axios и error
            return $axios.$get('https://jsonplaceholder.typicode.com/users')
                .then(users => { users })
                .catch(err => {
                    error(err);
                })
        }, 
        data() { // данные доступны на клиентской стороне
            return {
                pageTitle: 'Users pages',
                // ! в примере с asyncData users удаляется:
                users: [ 
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
        validate({params}) { // валидация nuxt; params - поля из контекста
            console.log(params); // => { id: 32 }

            return /^\d+$/.test(params.id);
            // если возвращается false -> this page could not be found
        },
        async asyncData({params, error, $axios}) { // asyncData поддерживает async
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

        <p>some text...</p>
        <p>some text...</p>
    </section>
</template>



// + FILE: layouts/error.vue (зарезервированное имя для страницы 404):
<template>
    <section>
        <h1>Error 404</h1>
        <next-link to="/">Home</next-link>
    </section>
</template>

<style scoped> 
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
        <nuxt /> <!-- место куда страница будет рендирениться -->
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
    <form @submit.prevent="onSubmit">
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
        <button class="btn btn-primary" type="submit">Enter</button>
    </form>
</template>

<script>
    export default {
        layout: 'empty', // устанавливаем layout empty.vue (по умолчанию стоит default.vue)
        methods: {
            onSubmit() {
                this.$store.dispatch('login');
                this.$router.push('/'); // редирект на главную
            }
        }
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

    Пример: находим модуль axios -> setup:

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
    }
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



<script>



// @ Fetch:

// CHANGE FILE: /store/users.js:
export const state = () => {
    users: []
};

export const mutations = {
    setUsers(state, users) {
        state.users = users;
    }
}

export const actions = {
    async fetchUsers({commit}) {
        try {
            // ! this
            const users = await this.$axios.$get('https://jsonplaceholder.typicode.com/users/');

            commit('setUsers', users);
        } catch (e) {
            throw e;    
        }
    },
    async fetchUserById({}, userId) {
        try {
            return await this.$axios.$get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        } catch (e) {
            throw e;    
        }
    }
}

export const getters = {
    users: state => state.users
}



</script>



// CHANGE FILE: /pages/users/index.vue:
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
        // async asyncData({store, error}) { 
        //     try {
        //         const users = await store.dispatch('users/fetchUsers'); // /store/users.js / fetchUsers
        //         return {}; // -> пустой объект
        //     } catch (e) {
        //         error(e);    
        //     }
        // },
        async fetch({store, error}) { // <-> asyncData только не надо ничего возвращать
            try {
                if (store.getters['users/users'].length === 0) {
                    await store.dispatch('users/fetchUsers'); // заполняем state
                }
            } catch (e) {
                error(e);
            }
        }, 
        data() { // данные доступны на клиентской стороне
            return {
                pageTitle: 'Users pages',
            }
        },
        computed: {
            users() {
                return this.$store.getters['users/users'];
            }
        },
        methods: {
            goTo(user) { 
                this.$router.push(`/users/${user.id}`);
            }
        }        
    }
</script>



// CHANGE FILE: /pages/users/_id.vue:
<template>
    <h1>UserName: {{ user.name }}</h1> 
    <hr />
    <b>{{ user.email }}</b>
</template>

<script>
    export default {
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        async asyncData({params, err, store}) {
            try {
                const user = await store.dispatch('users/fetchUserById', params.id);

                return {user};
            } catch(e) {
                error(e);
            }               
        }
    }
</script>



<script>



// @ Middleware:

// + FILE: /store/index.js:
export const actions = {
    login({commit}) {
        commit('setToken', 'true');
    },
    logout({commit}) {
        commit('clearToken');
    }
}

export const state = () => ({
    token: null
});

export const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    clearToken(state) {
        state.token = null;
    }
};

export const getters = {
    isAuth: state => !!state.token
}


// + FILE: /middleware/auth.js/:
export default function ({store, redirect}) {
    if (!store.getters.isAuth) {
        redirect('/login');
    }
}



</script>



// CHANGE FILE: /about/index.vue:
<template>
    <section>
        <h1>About page</h1>

        <p>some text...</p>
        <p>some text...</p>
    </section>
</template>

<script>
    export defalt {
        middleware: ['auth'] // применяем middleware (вход на страницу только для авторизованных пользователей). Можно применять несколько middleware
    }
</script>



<script>




// @ NuxtServerInit:
// Реализуем загрузку пользователей на какой странице бы не находились


// CHANGE FILE: /store/index.js:
export const actions = {
    // ...
    async nuxtServerInit({dispatch}) {
        await dispatch('users/fetchUsers');
    }
}





