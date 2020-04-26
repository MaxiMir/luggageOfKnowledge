/**
 * Как заставить ваши веб-приложения работать в автономном режиме https://habr.com/ru/company/edison/blog/474374/

 Service Worker API — это фундамент концепта прогрессивных веб-приложений, отвечающий за возможность работы оффлайн, оптимизацию сетевых запросов, push-уведомления и массу других полезных вещей. Формально определяемый как программируемый сетевой прокси, сервис-воркер дает нам возможность реализовать целый слой логики приложения и содержит массу нюансов в своем поведении, которые и будут представлены в рамках сессии.
*/

// #@ Фоновая синхронизация
if ('SyncManager' in window) {
    // Реализуем функциональность для оффлайн-режима
}


// #@ Подписка на Push-уведомления
if (!('PushManager' in window)) {
    // Прячем интерфейс подписки на push-уведомления
}


// #@ Действия в уведомлениях
if ('actions' in Notification.prototype) {
    // Можем использовать кнопки с разными действиями
}

// #@ Регистрируем Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw-workbox.js')
            .then(/*...*/);
    });
}

/** Неприятная правда
 * Сервис-воркер не улучшит первый запуск сайта
 * При первом запуске пользователь скачает ресурсы из набора Application Shell дважды
 * В некоторых случаях сервис-воркер не только не ускорит, но и замедлит повторные открытия
 * Архитектура Application Shell идет вразрез с идеей веба про "всегда последней версии"
 * Даже широко известные, хорошо поддерживаемые библиотеки с открытым кодом могут содержать ошибки
 * И даже они не всегда успевают отражать изменения в спецификациях
 */


// #@ Инструментарий сервис-воркера:
/**
 + Service Worker API
 + Cache API
 + IndexedBD
 + Fetch
 + Clients API
 + Broadcast Channel API
 + postMessage
 + Push API
 + Notifications API

 - Local Storage
 - Session Storage
 - XMLHttpRequest
 - DOM
 */

// FILE: sw-workbox.js:
const appShellFilesToCache = [
    //...
    './non-existing.html'
];

self.addEventListener('install', event => {

    event.waitUntil( // не дает браузеру "убить" сервис-воркер пока он не завершит работу (в chrome ~ 30 секунд )
        caches
            .open('appshell')
            .then(cache => {
                return cache
                    .addAll((appShellFilesToCache)) // складываем в файлы кэш
                    .catch(err => {
                        console.error(err);
                        throw err;
                    })
            }
        )
    )
});

/** Ошибки у сервес-воркера:
 * Ошибки HTTP
 * Время работы сервис-воркера
 * Ошибки хранилищ
 * Дубликаты ресурсов в addAll():
 const appShellFilesToCache = [
 './styles.css',
 //...
 './styles.css'
 ]
 */


// Определяем поместиться ли в storage файл:
if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage
        .estimate()
        .then(({usage, quota}) => {
            console.log(`Using ${usage} out of ${quota} bytes`);
        }
    );
}




// #@ Кеширование ресурсов с других адресов*
// * = origin - протокол + доменное имя + хост + порт

// #1 Вариант:
/**
 * Добавить заголовки CORS на удаленной стороне
 * Обработать opaque ответы
 ограничения opaque ответов:
 - Свойство status всегда равно 0 и не зависит от того, успешен запрос или нет
 - Методы Cache API add()/addAll() срабатывают аварийно, если статус хотя бы одного из ответов не находится в диапазоне 2XX
 */
// FILE:
// FILE: sw-workbox.js:
const appShellFilesToCache = [
    //...
    'https://workboxjs.org/offline-ga.min.svg'
];

self.addEventListener('install', event => {

    event.waitUntil( // не дает браузеру "убить" сервис-воркер пока он не завершит работу (в chrome ~ 30 секунд )
        caches
            .open('appshell').then(cache => {
                return cache.addAll((appShellFilesToCache)) // складываем в файлы кэш
                    .catch(err => {
                        console.error(err);
                        throw err;
                    });
            }
        )
    )
});

// Решение для no-cors:
fetch(event.request).then(response => {
    if (response.ok || response.status === 0) {
        let copy = response.clone();
        caches.open('runtime').then(cache => {
            cache.put(request, copy);
        });

        return response;
    }
});

// Проблемы:
/**
 * Мы не знаем, что к нам пришло в качестве ответа, так что есть вероятность закешировать 404, 500 и т.д.
 * Каждый закешированный ресурс занимает как минимум 7MB в Cache Storage
 */




// #@ Отслеживание обновления
// #1 На самой странице, через статус регистрации сервис-воркера
navigator.serviceWorker
    .register('sw-handmade.js')
    .then(registration => {
        if (registration.waiting) {
            // Показывам приглашение обновить страницу
        }
    });

// #2 в сервис-воркере, после отправив уведомление клиентам через BroadcastChannel API или postMessage




// #@ Подзагрука запроса навигации:
addEventListener('activate', event => {
   event.waitUntil(async function () {
        // Feature-detect
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }
    }());
});

// Используем ее результат:
addEventListener('fetch', event => {
   event.respondWith(async function () {
        // Лучший вариант: отвечает из кэша
       const cachedResponse = await caches.match(event.request);

       if (cachedResponse) {
           return cachedResponse;
       }

       // OK вариант: отвечаем результатом предзагрузки
       const response = await event.preloadResponse;

       if (response) {
           return response;
       }

       // Худший вариант: идем в сеть
        return fetch(event.target);
   }());
});



// #@ Помошники:
/**
 **** Фреймворки
 * create-react-app
 * preact-cli
 * polymer-cli
 * vue-cli
 * angular-cli

 **** Генераторы
 * sw-precache / sw-toolbox
 * Workbox
 * offline-plugin для Webpack
 * PWABuilder.com

 **** Аудит
 * Lighthouse
 * Sonarwhal
*/

// #@ Workbox
/**
 * App shell
 * Повторение неуспешных запросов
 * Динамическое кеширование
 * Оффлайн GA
 * Уведомления об обновлениях
 * Build-интеграции
 */


// #@ План спасения:
/**
 * Разместить исправленный сервис-воркер (или no-op)
 * Удостовериться, что сервис-воркер не берется из кеша HTTP
 */

// No-op
self.addEventListener('install', () => {
    self.skipWaiting();
});

// Крайняя мера для UX
self.addEventListener('activate', () => {
   self.clients
       .matchAll({type: 'window'})
       .then(tabs => {
           tabs.forEach(tab => {
               tab.navigate(tab.url);
           });
       })
});


// Обновление и обход кеша HTTP
// Побайтовое сравнение, нужно использовать версионность: Cache-Control: no-cache

// Ресурсы, импортированные через importScripts
// Контент не проверяется, нужно менять название ресурса:
importScripts(`sw-lib.js?v=${VERSION}`);

// FILE: index.html
// updateViaCache. Значения "imports", "all", "none". Позволяет загружать "свежее"
navigator.serviceWorker.register('/sw.js', {
   updateViaCache: 'none'
});


// #@ Поддержка WebP (c WASM)
// FILE: service-worker.js событие watch
event.respondWith(async function() {
    const response = await fetch(event.request);
    const buffer = await response.arrayBuffer();

    const WebPDecoder = await fetchWebPDecoder();
    const decoder = new WebPDecoder(buffer);
    const blob = await decoder.decodeToBMP();

    return new Response(
        blob,
        { headers: {"content-type": "image/bmp", "status" : 200} }
    );
}());


// #@ Фоновая загрузка
/**
  * Контролируемые, предсказуемые, при необходимости возобновляемые скачивания и закачивания файлов без зависимости от состояния вебсайта.
  * Все возможности для уведомления пользователя о состоянии скачивания
*/

// FILE: index.html:
const registration = await navigator.serviceWorker.ready;
await registration.background.fetch(
  'my-series',
  ['s01e01.mpg', 's01e02.mpg'],
    {
        title: 'Downloading My Series',
        downloadTotal: 10000000000
    }
);

const bqFetches = await registration.backgroundFetch.getIds();
console.log(bqFetches);

// FILE service-worker.js:
addEventListener('backgroundfetchsuccess', event => {
   event.waitUntil(
       (async function() {
            try {
                // Копируем результаты в Cache Storage
                //...
            } catch (err) {
                await event.updateUI({ title: `Fail: ${err}`})
            }
       })()
   );
});

addEventListener('backgroundfetchfail', event => {
   // ...
});

addEventListener('backgroundfetchclick', event => {
    // ...
});
