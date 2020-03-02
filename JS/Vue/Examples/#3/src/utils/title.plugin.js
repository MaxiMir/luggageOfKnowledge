import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE; // берем из .env
      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};


// импортируем в main.js
