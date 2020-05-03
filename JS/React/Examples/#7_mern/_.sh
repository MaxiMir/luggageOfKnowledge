# MERN - MONGO DB + EXPRESS + REACT + NODE JS

# BACKEND:
$ npm i express mongoose
$ npm i -D nodemon concurrently # concurrently - для одновременного запуска FRONTEND и BACKEND
$ npm i config # для работы с конфигурационными файлами (FOLDER config)
$ npm i bcryptjs # для хэширования и сравнения паролей
$ npm i express-validator # для валидации данных
$ npm i jsonwebtoken # для создания токенов

# FRONTEND:
$ npx create-react-app client # помещаем в папку client
$ cd client/
$ rm -rf node_modules/
$ rm -rf .git
$ npm i
$ npm i materialize-css@next
$ npm i react-router-dom # для роутов



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



