1. Создаем manifest.json (meta data for PWA)
Можно создать через генератор [www.app-manifest.firebaseapp.com](www.app-manifest.firebaseapp.com)
```json
"start_url": ".", // <-> ./index.html
```

2. В index.html подключаем manifest.json:
```html
<link rel="manifest" href="/manifest.json">
```

3. Создаем sw.js (прослойка между самим приложением и запросами в network).

4. Подключаем sw.js в app.js

5. Запускаем приложение
```shell
$ npx live-server . --port=3001
```

