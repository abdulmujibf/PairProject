const mailer = require("nodemailer");

function mail(email){
    let body ={
        from: 'pairproject9@gmail.com',
        to: email,
        subject: 'Your Registered',
        html: '<h2>Terima Kasih Telah Mendaftar</h2><br>',
    }
    
    const transporter =   mailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'pairproject9@gmail.com',
            pass : 'pairproject123'
        }
    })
    
    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    
    transporter.sendMail(body,(err, result) =>{
        if (err) {
            console.log(err);
            return false
        }
        console.log(result);
        console.log("email sent");
    })
}

module.exports = mail