const router = require('express').Router()
const Cause = require('../models/Cause')



router.get('/create',(req,res,next)=>{
  res.render('users/create')
})

module.exports = router