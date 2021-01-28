const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const mid = require('../middleware/mid')

router.get('/', mid,Controller.pageRoom)
router.post('/', mid,Controller.roomPost)

module.exports = router