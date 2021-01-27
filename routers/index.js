const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const room = require('./rooms')

router.get('/', Controller.homePage)

router.use('/rooms', room)

router.get('/register', Controller.registerForm)
router.post('/register', Controller.registerPost)

module.exports = router