# MERN - MONGO DB + EXPRESS + REACT + NODE JS

# BACKEND:
$ npm i express mongoose
$ npm i -D nodemon concurrently # concurrently - для одновременного запуска FRONTEND и BACKEND
$ npm i config # для работы с конфигурационными файлами (FOLDER config)
$ npm i bcryptjs # для хэширования и сравнения паролей
$ npm i express-validator # для валидации данных
$ npm i jsonwebtoken # для создания токенов
$ npm i shortid # для генерации ID
$ npm i cross-end # позволяет добавлять разные ENV переменные в зависимости от платформы (например, cross-env NODE_ENV=production)


# FILE: package.json:
<<comment
{
	...
	"scripts": {
		"start": "node app.js",
		"server": "nodemon app.js", // nodemon - пакет для перезагрузки сервера
		"client": "npm run start --prefix client", // --prefix исполняется start в папке client
		"dev": "concurrently \"npm run server\" \"npm run client\"" // запускает и реакт и сервер
	}
}
comment

# URI: mongodb.com
<<comment
	Context
	  -> new Project
	  -> Name Your Project: mern
	  > create project

	Build cluster
	  -> FREE
	  -> Azure + netherlands
	  -> Create Cluster

  Connect
	  -> Add Your Current IP address
	  -> Create a MongoDB User
	  -> Choose a connection method
	  -> Connect Your Application
	  -> Connection String Only -> Copy
comment


# FRONTEND:
$ npx create-react-app client # помещаем в папку client
$ cd client/
$ rm -rf node_modules/
$ rm -rf .git
$ npm i
$ npm i materialize-css@next
$ npm i react-router-dom # для роутов

# FILE: package.json
# Любой запрос с фронта проксируем в режиме разработки:
<<comment
  "proxy": "http://localhost:5000",
comment





# НА ХОСТИНГЕ
$ sudo apt udpate
$ sudo apt install git
$ git clone #...
$ cd #...project
$ sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt -y install nodejs
$ npm install
$ npm run client:install
$ npm run client:build
$ cd config
$ nano production.json # port -> 80, baseUrl: "https://link.ru" (Ctrl+O Enter Ctrl+X)
# mongodb добавить IP Сервера
$ cd #...project
$ npm run start
$ sudo npm i -g pm2 # для сервера (npm start -> pm2 start npm --start)
$ pm2 start npm --start



