import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App), // рендерим App компонент (App.vue)
}).$mount('#app'); // маунтим в элемент с id = #app


// ! main.js - главный файл, который запускает все приложение
