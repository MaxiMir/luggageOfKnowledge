import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue, options) { // install вызывает Vue, чтобы применить этот плагин
    Vue.prototype.$message = function(html) { // $ - системная переменная
      M.toast({html}); // М.toast - показ Materialized всплывашки с сообщением
    };
    
    Vue.prototype.$error = function(html) {
      M.toast({html: `[${localizeFilter('Error')}]: ${html}`});
    };
  },
};

// импортируем в main.js
