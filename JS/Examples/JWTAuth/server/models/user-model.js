const { Schema, model } = require('mongoose')

const UserSchema = new Schema({ // сущность пользователя
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false }, // подтвердил ли почту
	activationLink: { type: String },
})

module.exports = model('User', UserSchema)
