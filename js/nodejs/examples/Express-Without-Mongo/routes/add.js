const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
	res.render('add', { // рендерим страницу index.hbs
		title: 'Добавить курс',
		isAdd: true
	})
})

router.post('/', async (req, res) => {
	const {title, price, img} = req.body

	const course = new Course(title, price, img)

	await course.save()

	res.redirect('/courses')
})

module.exports = router
