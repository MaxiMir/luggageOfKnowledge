const {Schema, model} = require('mongoose')

const schema = new Schema({ // конфигурация для будущей модели
	title: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false
	}
})

module.exports = model('Todo', schema) // регистрация модели Todo
