```shell script
 # URI: mongodb.com
 # URI: mongoosejs.com - для удобной работы с mongo
 
 
 # + FOLDER: mongodb/data
 # + FOLDER: mongodb/data/db
 # + FOLDER: mongodb/log/
 # + FILE: mongodb/log/mongo.log
 
 $ cd bin
 $ mongod --directoryperdb --dbpath С:\mongodb\data\db --logpath С:\mongodb\log\mongo.log --logappend --rest --install
 # добавление флагов
 # --directoryperdb - для каждой базы отдельная папка
 # --dbpath - куда складывать базы
 # --logpath - путь для логов
 # --logappend - конкатенация логов
 # --rest --install - использование mongo как сервиса
 
 $ net start MongoDB # запуск сервиса
 $ mongo # запуск CLI (в bin)
 $ > show databases
 $ > use maximir # переключение на БД maximir
 $ > show collections # => persons
 $ > db.persons.find() # => выведет все записи из коллекции
 
 $ npm init
 $ npm install mongoose --save
 $ npm install nodemon --save-dev # по ctrl+s автоматически перезапускает сервер nodejs
 $ npm install nodemon -g # для доступа в консоли
```
FILE: package.json:
```json
{
  "scripts": {
    "start": "nodemon index.js"
  }
}    
```
FILE: index.js:
```js
const mongoose = require('mongoose')
require('./person.model')

mongoose.Promise = global.Promise() // переопределяем Promise из mongoose на глобальный Promise из nodejs (лечение DeprecationWarning)

mongoose.connect('mongodb://localhost/maximir', { // если db maximir нет, mongoose ее создаст
  useMongoClient: true
}).then(() => console.log('MongoDB has started...'))
.catch(e => console.log(e))

const Person = mongoose.model('persons')
const person = new Person({ // описание нового значения в коллекции
  name: 'Max',
  age: 24,
  phones: [4697171]
})

person.save() // сохранение новой записи в коллекции
    .then(user => console.log(user))
    .catch(e => console.log(e))
// => {_id: 59ec9910559, name: 'Max', age: 24, phones: [4697171], isMarried: false}

Person.find({}) // получение всех записей из коллекции
    .then(persons => console.log(persons))

Person.find({age: 24}) // получение записей с age = 24
    .sort('age') // сортировка по age ASC
    .then(persons => console.log(persons))

Person.find({name: {'$in': ['Person 1', 'Person 2']}}) // получение записей с name = Person 1 или Person 2
    .limit(2) // ограничение по кол-ву
    .sort('-age') // сортировка по age DESC
    .then(persons => console.log(persons))

Person.find({age: 24})
    .then(persons => {
      const p = persons[0]
      Person.find({_id: p._id}).remove() // удаление записи
          .then(_ => console.log('Removed'))
          .catch(e => console.log(e))
    })
    
[{name: 'Person 1', age: 55}, {name: 'Person 2', age: 70}, {name: 'Person 3', age: 90}].forEach(p => {
  new Person(p).save()
})
```
FILE: person.model.js:
```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({ // описание модели
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 18, // валидаторы по значению
    max: 90, // валидаторы по значению
    default: 20
  },
  isMarried: {
    type: Boolean,
    default: false
  },
  phones: {
    type: [Number], // массив чисел
    default: []
  }
})

mongoose.model('persons', personSchema) // persons - название коллекции, в которой будет храниться
```