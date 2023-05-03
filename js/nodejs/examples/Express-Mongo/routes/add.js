const {Router} = require('express')
const {validationResult} = require('express-validator/check') // проверяем параметры из body (для query параметров - query), check = body + query
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
	res.render('add', {
		title: 'Добавить курс',
		isAdd: true
	})
})

router.post('/', auth, courseValidators, async (req, res) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(422).render('add', {
			title: 'Добавить курс',
			isAdd: true,
			error: errors.array()[0].msg,
			data: {
				title: req.body.title,
				price: req.body.price,
				img: req.body.img,
			}
		})
	}

	const course = new Course({
		title: req.body.title,
		price: req.body.price,
		img: req.body.img,
		userId: req.user // req.user._id
	})

	try {
		await course.save() // сохранение модели в коллекцию
		res.redirect('/courses')
	} catch (e) {
		console.log(e)
	}
})

module.exports = router
