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
        console.log(req.body)
    }
    
}


module.exports = Controller