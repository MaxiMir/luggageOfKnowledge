import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home'; // подключаем компонент для роутинга

Vue.use(Router); // регистрируем роутер как плагин

export default new Router({
    mode: 'history', // для слешей в путях
    routes: [
        {
            path: '/',
            component: Home // имя компонента (views/Home.vue)
        },
        {
            path: '/todos',
            component: () => import('./views/Todos.vue') // применяем LazyLoading для страницы (загрузка по требованию) - оптимизация уменьшающая размер приложения и более быстрой ее загрузки
        }
    ]
})