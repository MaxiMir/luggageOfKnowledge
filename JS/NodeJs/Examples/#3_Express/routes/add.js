const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', { // рендерим страницу index.hbs
    title: 'Добавить курс',
    isAdd: true
  })
})

module.exports = router
