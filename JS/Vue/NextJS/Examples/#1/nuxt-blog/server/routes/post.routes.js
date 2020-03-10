const { Router } = require('express')
const passport = require('passport')
const upload = require('../middleware/upload') // middleware upload
const ctr = require('../controllers/post.controller') // контроллер post
const router = Router()


// Admin
// /api/post/admin
router.post(
  '/admin/',
  passport.authenticate('jwt', { session: false }), // middleware passport с проверкой токена
  upload.single('image'), // использовуем middleware upload; single - так как одна картинка; image - название в formData
  ctr.create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', { session: false }), // middleware passport с проверкой токена
  ctr.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }), // middleware passport с проверкой токена
  ctr.getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }), // middleware passport с проверкой токена
  ctr.update
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }), // middleware passport с проверкой токена
  ctr.remove
)

router.get(
  '/admin/get/analytics',
  passport.authenticate('jwt', { session: false }),
  ctr.getAnalytics
)


// Base - публичные без jwt токена
// /api/post
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/add/view/:id', ctr.addView)


module.exports = router
