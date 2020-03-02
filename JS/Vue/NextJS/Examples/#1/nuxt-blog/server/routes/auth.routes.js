const {Router} = require('express')
const {login, createUser} = require('../contollers/auth.controller')
const router = Router()


// Роут /api/auth/admin/login
router.post('/admin/login', login)

// Роут /api/auth/admin/create
router.post('/admin/create', createUser)

module.exports = router

