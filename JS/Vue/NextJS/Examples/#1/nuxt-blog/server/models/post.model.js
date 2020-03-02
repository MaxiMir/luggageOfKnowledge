const {Schema, model} = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // не вызываем !
  },
  views: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  comments: [
    {
      type: Schema.Types.ObjectId, // связка с комментариями
      ref: 'comments'
    }
  ]
})

module.exports = model('posts', postSchema)
