module.exports = function (req, res, next) {
	res.status(404).render('404', {
		title: 'Страница не найдена'
	})
}

// Подключаетс в index.js
