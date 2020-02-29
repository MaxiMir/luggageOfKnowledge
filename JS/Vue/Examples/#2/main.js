import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import Router from 'vue-router'; // #2

Vue.config.productionTip = false;

// Vue.use(Router) // регистрация роутера как плагина #2

new Vue({
  router, // передаем в конструктор роутер (затем $ npm run serve)
  render: h => h(App), // рендерим App компонент (App.vue)
}).$mount('#app'); // маунтим в элемент с id = #app

// main.js - главный файл, который запускает все приложение
