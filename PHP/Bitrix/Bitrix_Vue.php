<?
#@@@ Как подключать Vue

/**
 * Указать нужное расширение в зависимостях Bitrix CoreJS2:
rel => ['ui.vue']

 * Подключить в рамках компонента через метод:
\Bitrix\Main\UI\Extension::load('ui.vue');
\Bitrix\Main\UI\Extension::load('ui.vue.vuex'); // Vuex

 * Динамическое подключение в рамках страницы через метод (main > 18.5.200):
BX.Runtime.loadExtension('ui.vue').then(function(exports) {
    var Vue = exports.Vue;
});

 * В ES6 кода (при использовании Bitrix JS CLI) через конструкцию:
import {Vue} from 'ui.vue'

 * Для запуска Vue в режиме откладки нужно в /bitrix/php_interface/init.php:
define('VUEJS_DEBUG, true);
*/


#@@@ Как подключать Vue:
/*
 * ES5 или вызов из браузера. 
Все функции, которые доступны в документации Vue, 
нужно вызывать с префиксом BX: 
BX.Vue.component(...), BX.Vue.extend(...), BX.Vue.nextTick(...) и т.д.

Исключение является только создание экземляра, 
вместо new Vue(...) используется BX.Vue.create(...)

 * ES6 (при использовании Bitrix JS CLI)
Импортируйте библиотеку import {Vue} from 'ui.vue' после этого,
можете обращаться к Vue без префикса BX.
При этом для создания экземпляра так же как в случае с ES5,
вместо new Vue(...) использовать Vue.create(...)
*/

// Рекомендуется создавать Vue компоненты как расширение Bitrix CoreJS


#@@@ Глобальная шина событий:
Vue.event.$on('moduleName:componentName:eventName', this.onEventHandler);
Vue.event.$off('moduleName:componentName:eventName', this.onEventHandler);
Vue.event.$emit('moduleName:componentName:eventName', {name: 'value'});
// Если не используем Bitrix JS CLI, полное имя метода BX.Vue.event


#@@@ Наследование компонентов:
Vue.cloneComponent('new-component-name', 'source-component-name', {
    template: `
        <div class="component">
            {{result}}
        </div>
    `
}) // здесь меняем шаблон

// Если не используем Bitrix JS CLI, полное имя метода BX.Vue.event

#@@@ Кастомизация компонентов:
Vue.mutateComponent('source-component-name', {
    template: `
        <div class="component">
            {{result}}
        </div>
    `
}) // меняем шаблон (так же могут быть изменены params|data|methods|computed|template)
// Предыдущие значения доступны с префиксом parent (напр, parentSendText)
// Если заменяем шаблон, предыдущая версия будет доступна через #PARENT_TEMPLATE#
// Если не используем Bitrix JS CLI, полное имя метода BX.Vue.event


#@@@ VuexBuilder:
/*
Часть расширения "ui.vue.vuex' ui > 18.5.100

> Формат описания Vuex.Storage, основанный на классах
> Возможность задания значений по умолчанию во время инициализацуии
> Возможность задания неймспейса во время инициализации
> Возможность сохранения в локальную базу данных браузера и восстановления после обновления страницы
> Возможность сброса данных в начальное состояние
*/