const router = require('express').Router()
const Cause = require('../models/Cause')

router.get('/create',(req,res,next)=>{
  res.render('users/create')
})

router.post('/create',(req, res, next)=>{
  Cause.create(req.body)
    .then(cause=>{
      //console.log(cause)
      res.redirect('/causes')
    }).catch(e=>next(e))
})
module.exports = router