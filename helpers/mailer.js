const nodemailer = require('nodemailer')
const hbs = require('hbs');
const fs = require('fs');
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAILPASS
  }
})

const accountCreated = hbs.compile(fs.readFileSync((__dirname, './views/mail/accountCreated.hbs'), 'utf8'));

exports.accountCreatedMail = function(to,subject,text,name){
  return transporter.sendMail({
      from: '"Butterfly" <hola@butterfly.com>',
      to, 
      subject, 
      text,
      html: accountCreated({name})
    })
    //.then(info => res.render('message', {email, subject, message, info}))
}