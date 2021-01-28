const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/:roomId', Controller.booking)

module.exports = router