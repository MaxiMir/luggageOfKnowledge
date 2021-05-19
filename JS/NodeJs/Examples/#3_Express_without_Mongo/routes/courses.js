const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
	const courses = await Course.getAll()

	res.render('add', {
		title: 'Курсы',
		isCurses: true,
		courses
	})
})

router.get('/:id/edit', async (req, res) => {
	if (!req.query.allow) { // если нет QUERY PARAM allow редиректим на главую
		return res.redirect('/')
	}

	const course = await Course.getById(req.params.id) // динамический параметр из роута

	res.render('course-edit', {
		title: `Редактировать ${course.title}`,
		course
	})
})

router.post('/edit', async (req, res) => {
	await Course.update(req.body)
	res.redirect('/courses')
})

router.get('/:id', (req, res) => { // обработчик для детальной страницы
	const course = await Course.getById(req.params.id) // динамический параметр из роута
	res.render('course', {
		layout: 'empty', // устанавливаем layout
		title: `Курс ${course.title}`,
		course
	})
})


module.exports = router
