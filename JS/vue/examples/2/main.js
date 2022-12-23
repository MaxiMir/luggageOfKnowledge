import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;


new Vue({
  router, // передаем в конструктор роутер (затем $ npm run serve)
  render: h => h(App), // рендерим App компонент (App.vue)
}).$mount('#app'); // маунтим в элемент с id = #app

// main.js - главный файл, который запускает все приложение
