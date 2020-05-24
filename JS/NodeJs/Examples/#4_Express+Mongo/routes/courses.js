const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find() // пустой find() забираем все записи
    .populate('userId', 'email name') // вместо _id добавляем email name пользователя (в request добавляется через middleware в index.js)
    .select('price title img') // поля из Course

  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses
  })
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const course = await Course.findById(req.params.id)

  res.render('course-edit', {
    title: `Редактировать ${ course.title }`,
    course
  })
})

router.post('/edit', auth, async (req, res) => {
  const { id } = req.body
  delete req.body.id

  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id })

    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.render('course', {
    layout: 'empty',
    title: `Курс ${ course.title }`,
    course
  })
})

module.exports = router
