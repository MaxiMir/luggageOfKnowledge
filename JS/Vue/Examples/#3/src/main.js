import Vue from 'vue';
import Vuelidate from 'vuelidate'; // импортируем плагин для валидации
import Paginate from 'vuejs-paginate'; // импортируем плагин для пагинации
import VueMeta from 'vue-meta'; // импортируем плагин для мет
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter'; // импортируем фильтр для даты
import currencyFilter from '@/filters/currency.filter'; // импортируем фильтр для валюты
import localizeFilter from '@/filters/localize.filter'; // импортируем фильтр для локализации
import tooltipDirective from '@/directives/tooltip.directive'; // импортируем директиву tooltip
import messagePlugin from '@/utils/message.plugin'; // импортируем утилиту для сообщений
import titlePlugin from '@/utils/title.plugin'; // импортируем утилиту для title
import Loader from '@/components/app/Loader'; // импортируем loader

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min'; // импортируем JS скрипты Material CSS

import firebase from 'firebase/app';
import 'firebase/auth'; // модуль для авторизации
import 'firebase/database'; // модуль для БД

Vue.config.productionTip = false;

Vue.use(messagePlugin); // регистрация плагина для сообщений
Vue.use(Vuelidate); // регистрация плагина для валидации
Vue.use(VueMeta); // регистрация плагина для мет
Vue.use(titlePlugin); // регистрация плагина для title

Vue.filter('date', dateFilter); // регистрация фильтра с названием date
Vue.filter('currency', currencyFilter); // регистрация фильтра с названием currency
Vue.filter('localize', localizeFilter); // регистрация фильтра с названием localize

Vue.directive('tooltip', tooltipDirective); // регистрация директивы с названием tooltip

Vue.component('Loader', Loader); // регистрация Loader
Vue.component('Paginate', Paginate); // регистрация Paginate


// Firabase инициализация:
firebase.initializeApp({
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
});

let app;

// Если модуль auth нашел локальные данные пользователя для автоматической авторизации вызовется коллбэк
firebase.auth().onAuthStateChanged(() => {
  if (!app) { // проверка, поскольку метод onAuthStateChanged может вызываться несколько раз
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
}); 




