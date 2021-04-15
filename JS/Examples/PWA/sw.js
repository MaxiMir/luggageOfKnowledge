const staticCacheName = 's-app-v3' // название версии кэша для статических файлов
const dynamicCacheName = 'd-app-v3' // название версии кэша для запросов

const assetUrls = [ // статические файлы, которые добавляем в кэш
  'index.html',
  '/js/app.js',
  '/css/styles.css',
  'offline.html'
]

self.addEventListener('install', async event => { 
  const cache = await caches.open(staticCacheName) // открываем кэш

  await cache.addAll(assetUrls) // добавляем статические файлы в кэш

  // более старый подход <-> event.waitUntil(caches.open().then(cache => cache.addAll([assetUrls]))) // добавляем все статические файлы в кэш 
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys() // ключи в кэше

  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name)) // удаляем неактуальные ключи(старой версии)
  )
})

self.addEventListener('fetch', event => { // вызывается при запросах (в тч и для статических файлов)
  const {request} = event
  const url = new URL(request.url)
  
  if (url.origin === location.origin) { // location - глобальный объект
    event.respondWith(cacheFirst(request)) // стратегия cacheFirst
    return
  } 

  event.respondWith(networkFirst(request)) // стратегия networkFirst
})

async function cacheFirst(request) {
  const cached = await caches.match(request) // есть ли данные в кэше

  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName) // открываем кэш

  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())

    return response
  } catch (e) {
    const cached = await cache.match(request) // есть ли данные в кэше

    return cached ?? await caches.match('/offline.html') // получаем статический файл (он в assetUrls)
  }
}