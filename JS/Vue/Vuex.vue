<script>
/**
    URI: vuex.vuejs.org
    Vue.js devtools - расширение для браузера

    $ vue create . # генерация проекта в текущей папке

    ? Generate project in current directory: yes
    ? Please pick a preset: Manually select features
    ? Check the features needed for your project: Babel
    ? Where do you prefer placing config for Babel, ... : In dedicated config files
    ? Save preset: no

    $ npm run serve
    $ npm i vuex
 */



// FILE: App.vue: 
</script>



<template>
    <div id="app">
        <PostForm />

        <h1>{{postsCount}}</h1>
        <div class="post" v-for="post in allPosts" :key="post.id">
            <h2>{{post.title}}</h2>
            <p>{{post.body}}</p>
        </div>
    </div>
</template>

<script>
// @ Без Vuex:
export default {
    name: "app",
    data() {
        return {
            allPosts: []
        }
    },
    async mounted() { 
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        const posts = await res.json();

        this.allPosts = posts;
    }
}

// @ C Vuex:
import { mapGetters, mapActions } from 'vuex'; // #2 вариант получения
import PostForm from './components/PostForm';

export default {
    name: "app",

    // #1 вариант получения:
    computed: {
        posts() {
            return this.$store.getters.allPosts; // использование геттера #allPosts
        }
    },

    // #2 вариант получения:
    computed: mapGetters(['allPosts', 'postsCount']), // использование геттера #allPosts allPosts и postsCount
    methods: mapActions['fetchPosts'], // использование action #action
    components: {
        PostForm
    },
    async mounted() {
        // без #action:
        this.$store.dispach('fetchPosts'); // вызов action

        // c #action:
        this.fetchPosts(); // вызов action
    }
}




// @ C Vuex:
// + FOLDER: /store/
// + FILE: /store/index.js:
import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post'; // импортируем отдельный модуль

Vue.use(Vuex); // регистрируем плагин

export default new Vuex.Store({
    actions: {},
    mutations: {}, // функции для изменения store
    state: {}, // изначальные данные
    getters: {}, // получение данных из store

    modules: { // декомпозиция логики vuex store (каждой сущности)
        post
    }
});



// + FOLDER: /store/modules/
// + FILE: /store/modules/post.js:
export default {
    actions: {
        async fetchPosts(ctx, limit = 3) { // ctx - контекст; {commit, getters, dispatch} - можно сразу деструктуризировать
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
            const posts = await res.json();
            ctx.commit('updatePosts', posts); // запуск мутации; название мутации, данные для мутации
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts;
        },
        createPost(state, newPost) {
            state.posts.unshift(newPost);
        }
    }, 
    state: {
        post: []
    }, 
    getters: {
        validPost(state) {
            return state.posts.filter(p => {
                return p.title && p.body;
            });
        },
        allPosts(state) { // #allPosts
            return state.posts;
        },
        postsCount(state) {
            return state.posts.length;
        },
        validPostsCount(state, getters) { // необходимо передать все getters
            return getters.validPost.length; // обращение к другому геттеру
        }
    }
}



// FILE: main.js:
import Vue from 'vue';
import store from './store'; // импортируем store (без названия файла тк index.js)
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    store, // регистрация store
    render: h => h(App),
}).$mount('#app');

// $ npm run serve




// + FILE: /components/PostForm.vue:
</script>


<template>
    <div>
        <form @submit.prevent="submit">
            <input type="text" placeholder="title" v-model="title">
            <input type="text" placeholder="body" v-model="body">
            <button type="submit">Create Post</button>
        </form>
        <hr>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
                title: "",
                body: ""
            }
        },
        methods: {
            ...mapMutations(['createPost']),
            submit() {
               this.createPost({
                   title: this.title,
                   body: thjis.body,
                   id: Date.now()
               });

               this.title = this.body = ''; 
            }
        }
    }
</script>

<style scoped>
    input {
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 10px;
        margin-bottom: 10px;
    }
</style>