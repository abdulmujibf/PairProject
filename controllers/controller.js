class Controller {
    static homePage(req, res){
        let minDate = new Date().toLocaleDateString('fr-CA')
        let maxDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(), 
            new Date().getDate() + 4,
        ).toLocaleDateString('fr-CA')
        res.render('home', {minDate, maxDate})
    }
    
    static pageRoom(req,res){
        res.render('room')
    }

    static roomPost(req,res){
        res.redirect('/rooms')
    }

    static registerForm(req, res){
        res.render('formRegister')
    }

    static registerPost(req, res){
        let {fullname, username, email, password, phone_number} = req.body
        let newUser = {fullname, username, email, password, phone_number}
        console.log(newUser)
    }
    
}


module.exports = Controller