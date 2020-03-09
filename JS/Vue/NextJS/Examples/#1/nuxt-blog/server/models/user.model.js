const {model, Schema} = require('mongoose')

const userSchema = new Schema({ // Schema - создает новую сущнось
  login: {
    type: String, // тип данных JS
    unique: true, // уникальное
    required: true // обязательное
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
})

module.exports = model('users', userSchema) // model - регистрирует модель users
