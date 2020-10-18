// @ PRPL pattern

/**

 # Push (или preload)
 Это значит используйте тег link с аттрибутом rel="preload" для важных скриптов или стилей. Ресурсы встраиваемые таким образом, грузятся в первую очередь.

 <link rel="preload" as="script" href="main.js">


 # Render the initial route as soon as possible (Первая отрисовка должна происходить как можно скорее)

 Другими словами это значит: уменьшайте время First Paint. Вставляйте инлайном самые важные CSS и JS. Для остальных скриптов, которые пользователь может подождать, добавьте аттрибут async

 <script src="main.js" async></script>


 # Pre-cache assets
 Используйте Service Worker и Cache Storage API чтобы кэшировать ресурсы на клиенте.


 # Lazy load
 Если ваш код находится в одном файле, то разделите его на chunks (чанки, маленькие части) и грузите их по мере надобности. Так же используйте lazy-loading для изображений.
 <img src="example.jpg" loading="lazy" alt="" />
 */