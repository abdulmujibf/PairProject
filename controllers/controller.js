const { User, Guest, Room, GuestBooking, DetailBooking } = require('../models')
const bcrypt = require('bcryptjs');

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
        let id = req.session.UserId
        let guestId = req.session.GuestId
        let dataBoking = req.body
        let guest
        Guest.findByPk(guestId)
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
            res.redirect('/login')
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
                return Guest.create({userId: data.id})
            }else{
                res.redirect('/login/?alert=Username/passwordinvalid')
            }
        })
        .then((data) => {
            req.session.GuestId = data.id
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static logOut(req,res) {
        delete req.session.UserId
        delete req.session.GuestId
        res.redirect('/')
    }

    static booking(req, res){
        let {roomId} = req.params
        let UserId = req.session.UserId
        let guestId = req.session.GuestId
        let guestBooking = GuestBooking.findAll({where: {GuestId: guestId}})
        let room = Room.findByPk(roomId)
        Promise.all([guestBooking, room])
        .then((values) => {
            let GuestBookingId = values[0][values[0].length-1].id
            let RoomId = roomId
            let totalHari = values[0][values[0].length-1].checkOut.getDate() - values[0][values[0].length-1].checkIn.getDate()
            let totalPrice
            if(totalHari === 0){
                totalPrice = values[1].price
            }else{
                totalPrice = totalHari * values[1].price
            }
            let obj = {GuestBookingId, RoomId, totalPrice}
            return DetailBooking.create(obj)
        })
        .then(() => {
            res.redirect('/booking/detail')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static detailBooking(req, res){
        let UserId = req.session.UserId
        let GuestId = req.session.GuestId
        let guestBooking
        GuestBooking.findAll({
            where:{GuestId},
            include: [Room]
        })
        .then(data => {
            guestBooking = data
            return DetailBooking.findAll()
        })
        .then(detail => {
            //
        })
        .catch(err => {
            res.send(err)
        })   
    }
}


module.exports = Controller