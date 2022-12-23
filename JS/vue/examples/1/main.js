import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false; // false - отключает предупреждение о работе в режиме разработки при запуске Vue.

new Vue({
  render: h => h(App), // рендерим App компонент (App.vue)
}).$mount('#app'); // маунтим в элемент с id = #app

// ! main.js - главный файл, который запускает все приложение
