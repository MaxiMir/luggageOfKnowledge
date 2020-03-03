const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../contollers/post.controller')
const router = Router()


// Admin
// /api/post/admin
router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}), // проверяем наличие токена
  upload.single('image'), // middleware upload; image - поле, в котором картинка
  ctr.create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}), // проверяем наличие токена
  ctr.getAll
)

router.get(
  '/admin/:id', // получение детальной страницы
  passport.authenticate('jwt', {session: false}), // проверяем наличие токена
  ctr.getById
)


router.put(
  '/admin/:id', // модификация детальной страницы
  passport.authenticate('jwt', {session: false}), // проверяем наличие токена
  ctr.update
)

router.delete(
  '/admin/:id', // модификация детальной страницы
  passport.authenticate('jwt', {session: false}), // проверяем наличие токена
  ctr.remove
)



// Base - публичные без jwt токена
// /api/post
router.get('/', ctr.getAll) // получение всех постов
router.get('/:id', ctr.getById) // получение детальной страницы
router.put('/:id', ctr.addView) // увеличение просмотров страницы



module.exports = router

