const { Router } = require('express')
const { validationResult } = require('express-validator/check') // проверяем параметры из body (для query параметров - query), check = body + query
const Course = require('../models/course')
const auth = require('../middleware/auth')
const { courseValidators } = require('../utils/validators')
const router = Router()

function isOwner(course, request) {
  return course.userId.toString() === req.user._id.toString()
}


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find() // пустой find() забираем все записи
      .populate('userId', 'email name') // вместо _id добавляем email name пользователя (в request добавляется через middleware в index.js)
      .select('price title img') // поля из Course

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId: req.user ? req.user._id.toString() : null,
      courses
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/edit', auth, courseValidators, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  try {
    const course = await Course.findById(req.params.id)

    if (isOwner(course, req)) {
      return res.redirect('/courses')
    }

    res.render('course-edit', {
      title: `Редактировать ${ course.title }`,
      course
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/edit', auth, async (req, res) => {
  const errors = validationResult(req)
  const { id } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${ id }/edit?allow=true`)
  }

  try {
    delete req.body.id
    const course = await Course.findById(id)

    if (isOwner(course, req)) {
      return res.redirect('/courses')
    }

    Object.assign(course, req.body) // заменяет значения переменных
    await course.save()
    // await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }

})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
      userId: req.user._id
    })

    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    res.render('course', {
      layout: 'empty',
      title: `Курс ${ course.title }`,
      course
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
