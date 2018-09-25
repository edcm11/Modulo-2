const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')
// const welcomeMail = require('../helpers/mailer').welcomeMail

const isLogged = (req,res,next)=>{
  if(req.isAuthenticated())next()
  else res.redirect('/login')
}

//signup
router.get('/signup',(req, res, next)=>{
  res.render('auth/signup')
})

router.post('/signup',(req, res, next)=>{
  const {username, email} = req.body
  User.register(req.body, req.body.password)
    .then(user=>{
      res.redirect('/login')
    }).catch(error=>{
      res.render('auth/signup',{data:req.body,error})
    })
})

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/signup"
}));

//login

router.get('/login', (req, res, next)=>{
  if (req.user) req.logOut()
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next)=>{
  req.app.locals.user = req.user;
  res.redirect('/profile')
})

router.get('/profile',(req,res,next)=>{
  res.render('users/profile')
})

router.get('/logout',(req, res, next)=>{
  req.logOut()
  req.app.locals.user = null
  res.redirect('/login')
})


module.exports = router