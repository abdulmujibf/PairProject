const { User, Guest, Room, GuestBooking, DetailBooking } = require('../models')
const bcrypt = require('bcryptjs');
const { use } = require('../routers');

class Controller {
    static homePage(req, res){
        let minDate = new Date().toLocaleDateString('fr-CA')
        let maxDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(), 
            new Date().getDate() + 4,
        ).toLocaleDateString('fr-CA')
        let UserId = req.session.UserId
        res.render('home', {minDate, maxDate, UserId})
    }
    
    static pageRoom(req,res){
        let UserId = req.session.UserId
        Room.findAll()
        .then((rooms) => {
            res.render('room', {room:rooms, UserId})
        })
        .catch((err) => {
            res.send(err.message)
        })
    }

    static roomPost(req,res){
        let UserId = req.session.UserId
        let id = req.session.UserId
        let dataBoking = req.body
        let user
        let guest
        User.findByPk(id)
        .then((data) => {
            user = data;
            let newGuest = {
                userId : user.id
            }
            return Guest.create(newGuest)
        })
        .then((dataGuest) => {
            guest = dataGuest;
            let newDataGuestBooking = {
                GuestId : guest.id,
                number_of_rooms : dataBoking.number_of_rooms,
                checkIn : dataBoking.checkIn,
                checkOut : dataBoking.checkOut
            }
            return GuestBooking.create(newDataGuestBooking)
        })
        .then(() => {
            res.redirect('/rooms')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static registerForm(req, res){
        let UserId = req.session.UserId
        res.render('formRegister',{UserId})
    }

    static registerPost(req, res){
        let {fullname, username, email, password, phone_number} = req.body
        let newUser = {fullname, username, email, password, phone_number}
        User.create(newUser)
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static loginForm(req, res){
        let UserId = req.session.UserId
        res.render('formLogin', {UserId})
    }

    static loginPost(req, res){
        let {username, password} = req.body
        User.findOne({
            where: {
                username: username
            }
        })
        .then((data) => {
            let checkPass = bcrypt.compareSync(password, data.password)
            if(data.username && checkPass){
                req.session.UserId = data.id
                res.redirect('/')
            }else{
                res.redirect('/login/?alert=Username / password invalid')
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static logOut(req,res) {
        delete req.session.UserId
        res.redirect('/')
    }

    static booking(req, res){
        let id = req.params.id
        let room 
        let guestBooking
        Room.findAll()
        .then((dataRoom) => {
            res.send(dataRoom)
        })
        res.send('masuk boooking details')
    }
}


module.exports = Controller