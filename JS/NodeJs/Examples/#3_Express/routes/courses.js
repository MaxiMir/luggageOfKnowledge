const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Курсы',
    isCurses: true
  })
})

module.exports = router
