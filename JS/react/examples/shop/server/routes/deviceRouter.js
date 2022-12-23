const Router = require('express')
const deviceController = require('../controllers/deviceController')

const router = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
