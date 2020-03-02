const {model, Schema} = require('mongoose')

const userSchema = new Schema({ // описание модели юзера
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
})

module.exports = model('users', userSchema) // регистрируем модель users
