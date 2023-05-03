const { Schema, model } = require('mongoose')

const TokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' }, // ref - ссылается на модель User
	refreshToken: { type: String, required: true },
})

module.exports = model('Token', TokenSchema)
