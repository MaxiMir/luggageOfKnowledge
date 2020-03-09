import Vue from 'vue'
import VueMarkdown from 'vue-markdown' // импортируем плагин для Markdown
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-Ru' // меняем на русскую локаль

Vue.use(Element, { locale })
Vue.component('vue-markdown', VueMarkdown) // регистрируем плагин для Markdown
