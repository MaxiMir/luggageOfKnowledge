1. Создаем manifest.json
Можно создать через генератор [www.app-manifest.firebaseapp.com](www.app-manifest.firebaseapp.com)
```html
"start_url": ".", // <-> ./index.html
```
2. В index.html подключаем manifest.json:
```html
<link rel="manifest" href="/manifest.json">
```

3. Создаем sw.js.

4. Подключаем sw.js в app.js

5. Запускаем приложение
```shell
$ npx live-server . --port=3001
```

