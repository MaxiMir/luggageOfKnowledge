const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	links: [{
		type: Types.ObjectId, // связка модели пользователя с определенными записями в БД. ref - модель к чему привязываем
		ref: 'Link' // к какой коллекции привязываемся
	}]
})

module.exports = model('User', schema)
