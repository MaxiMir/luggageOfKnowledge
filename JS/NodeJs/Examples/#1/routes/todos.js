const {Router} = require('express')
const Todo = require('../models/Todo') // импортирование модели Todo
const router = Router()

router.get('/', async (req, res) => {
	const todos = await Todo.find({}) // получаем все записи

	res.render('index', { // рендеринг главной страницы
		// передаваемые данные:
		title: 'Todos  list',
		isIndex: true,
		todos // передаем в шаблон
	})
})

router.get('/create', (req, res) => {
	res.render('create', { // рендеринг страницы /create
		// передаваемые данные:
		title: 'Create todo',
		isCreate: true
	})
})

router.post('/create', async (req, res) => {
	const todo = new Todo({
		title: req.body.title
	})

	await todo.save() // создание новой сущности в модели
	res.redirect('/') // редирект на главную
})

router.post('/complete', async (req, res) => {
	const todo = await Todo.findById(req.body.id)

	todo.completed = !!req.body.completed // обновление значения записи

	await todo.save()
	res.redirect('/') // редирект на главную
})

module.exports = router
