const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, 'views', 'index.html')) // в ответе отдаем содержимое файла
	res.render('index', { // рендерим страницу index.hbs
		title: 'Главная',
		isHome: true
	})
})

module.exports = router
