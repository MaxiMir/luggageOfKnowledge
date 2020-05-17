const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}) // поле id идет по умолчанию

courseSchema.method('toClient', function () { // трансформация данных для client
  const course = this.toObject()

  course.id = course._id
  delete course._id

  return course
})

module.exports = model('Course', courseSchema)
