const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const detailBoking = require('./detailBooking')
const room = require('./rooms')
const mid = require('../middleware/mid')

router.get('/', Controller.homePage)

//login
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginPost)

//register
router.get('/register', Controller.registerForm)
router.post('/register', Controller.registerPost)

//logout
router.get('/logout', Controller.logOut)

//room
router.use('/rooms', room)
router.use('/detailBooking', detailBoking)

module.exports = router