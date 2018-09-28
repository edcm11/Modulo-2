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

router.get('/profile/:username', ensureAuthenticated, (req,res,next)=>{console.log()
  res.render('users/profile',req.user)
})

///EDIT

router.get('/:username/edit',(req,res,next)=>{
  //const {username} = req.params
  console.log(req.user._id)
  User.findById(req.user._id) 
  .then(user=>{
    res.render('../views/users/editUser.hbs',user)
  }).catch(e=>next(e))
})

router.post('/:username/edit',uploadCloud.single('photoURL'),(req,res,next)=>{
  const {username} = req.params
  if(req.file) req.body['photoURL'] = req.file.url
  User.findOneAndUpdate({username:username},{$set:req.body},{new:true})
  .then(user=>{
    res.redirect('/profile/:username')
  }).catch(e=>{
    console.log(e)
  })
})    
  

router.get('/logout',(req, res, next)=>{
  req.logOut()
  req.app.locals.user = null
  res.redirect('/login')
})


module.exports = router