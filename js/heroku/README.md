```shell
npm init -y # для генерации package.json
npm i express # устанавливаем express
```

FILE: **package.json**:
```js
"scripts": {
  "start": "node index" // для запуска нашего приложения + в т.ч и для heroku
},
```

FOLDER: **index.js**
Прописываем логику

```shell
npm start

heroku --help
heroku login
heroku create # создаем новый проект
```

https://dashboard.heroku.com/apps
> открываем вкладку -> deploy

```shell
git init
git add .
git commit -m "created"
heroku git:remote -a obscure-forest-49677 # где obscure-forest-49677 название приложения
git push heroku master
heroku open # открываем страницу с проектом в браузере
```

