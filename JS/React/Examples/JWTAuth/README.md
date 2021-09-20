### JWT Токены

Строка, состоящая из 3 частей разделенных точкой:

eyJhbOiJIUzl**.**eykwINjM5MDlyfq**.**SflKQssw5c

заголовок**.**данные**.**сигнатура

```json
// Заголовок
{
  "alg": "HS512",
  // алгоритм шифрования
  "typ": "JWT"
  // тип токена
  // другие вспомогательные элементы
}

// Данные, храняться в открытом доступе:
{
  "id": 1,
  "username": "MaxiMir",
  "roles": ["admin", "manager"],
}

// Сигнатура(для проверки на то что токен не был подделан):
secret: "КАКАЯ_ТО_СЕКРЕТНАЯ_СТРОКА"
```



#### ACCESS

> Живет: 15-30 мин

> Используется для доступа к сервису

> Храним в local storage 


#### REFRESH

> Живет: 15-60 дней

> Используется для обновления access 

> храним в httpOnly cookie (чтобы через JS нельзя было изменить эти куки)


#### SERVER:

```shell
npm init -y
npm i express cors cookie-parser # cors - чтобы с браузера можно было отправлять запросы
npm i nodemon --save-dev # для автоматической перезагрузки сервера в случае изменений
npm i dotenv # модуль для конфигураций
npm i mongoose

npm i jsonwebtoken bcrypt uuid

npm i nodemailer # для работы с почтой

npm i express-validator
```

В настройках почты включить протокол IMAP

> SMTP_HOST - сервер исходящей почты (указан в подробнее)

> SMTP_PORT - порт (указан в подробнее)


#### FRONTEND:

```shell
npx create react-app my-app --template typescript # cra with ts

npm i mobx mobx-react-lite axios @types/axios # mobx-react-lite для функциональных компонентов
```
