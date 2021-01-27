const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.pageRoom)
router.post('/', Controller.roomPost)


module.exports = router