const { Router } = require('express')
const passport = require('passport')
const { login, createUser } = require('../controllers/auth.controller')
const router = Router()


// Роут /api/auth/admin/login
router.post('/admin/login', login)

// Роут /api/auth/admin/create
router.post(
  '/admin/create',
  passport.authenticate('jwt', { session: false }), // middleware passport с проверкой токена
  createUser
)

module.exports = router

