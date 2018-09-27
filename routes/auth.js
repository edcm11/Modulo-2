const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')
const accountCreatedMail = require('../helpers/mailer').accountCreatedMail
const uploadCloud = require('../helpers/cloudinary');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

//signup
router.get('/signup',(req, res, next)=>{
  res.render('auth/signup')
})

router.post('/signup',(req, res, next)=>{
  const {username, email} = req.body
  User.register(req.body, req.body.password)
    .then(user=>{
      accountCreatedMail(username,email)
      res.redirect('/login')
    }).catch(error=>{
      res.render('auth/signup',{data:req.body,error})
    })
})

//login

router.get('/login', (req, res, next)=>{
  if (req.user) req.logOut()
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next)=>{
  const {username} = req.user
  req.app.locals.user = req.user;
  res.redirect(`/profile/${username}`)
})

router.get('/profile/:username', ensureAuthenticated, (req,res,next)=>{
  res.render('users/profile',req.user)
})

router.get('/edit/:username',  ensureAuthenticated,(req,res) => {
     res.render('../views/users/editUser.hbs') 
  }
)

router.post("/edit/:username", (req,res,next) => {
 let {username} = req.params;
 User.findOneAndUpdate(username, {...req.body}, {new: true})
 .then(user => {
   req.app.locals.loggedUser = user
   res.redirect('/profile')
 })
 .catch(e => next(e))
})

////***********--PROFILE-IMAGE--***********////
router.get('/edit_image', ensureAuthenticated, (req,res) => {
 res.render('../views/users/edit_image.hbs')
})

router.post('/edit_image', ensureAuthenticated, uploadCloud.single('photoURL'), (req,res,next) => {
 User.findOneAndUpdate(req.app.locals.loggedUser.username, {photoURL: req.file.url}, {new: true})
 .then(user => {
   req.app.locals.loggedUser = user
   console.log(user)
   res.redirect('/profile')
 })
 .catch(e => next(e))
})

router.get('/logout',(req, res, next)=>{
  req.logOut()
  req.app.locals.user = null
  res.redirect('/login')
})


module.exports = router