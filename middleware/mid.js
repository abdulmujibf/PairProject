const mid = (req,res, next) => {
    if(req.session.UserId){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports = mid