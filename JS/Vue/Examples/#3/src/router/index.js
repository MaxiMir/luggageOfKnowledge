import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'}, // свойства роута
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'}, // свойства роута
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true}, // свойства роута
    component: () => import('../views/Record.vue'),
  },
];

const router = new VueRouter({
  mode: 'history', // убирает # в пути + / в пути
  base: process.env.BASE_URL, // по умолчанию базовый URL
  routes,
});

export default router;
