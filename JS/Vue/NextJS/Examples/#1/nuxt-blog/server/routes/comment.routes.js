const {Router} = require('express')
const {create} = require('../contollers/comment.controller')
const router = Router()

// /api/comment
router.post('/', create)

module.exports = router
