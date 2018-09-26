const router = require('express').Router()
const Cause = require('../models/Cause')
const uploadCloud = require('../config/cloudinary.js');


router.get('/create',(req,res,next)=>{
  res.render('../views/users/create.hbs')
})

router.post('/create',(req, res, next)=>{
  Cause.create(req.body)
    .then(cause=>{
      //console.log(cause)
      res.redirect('/step2')
    }).catch(e=>next(e))
})

router.get('/step2',(req,res,next)=>{
  res.render('../views/home/step2')
})

router.post('/step2',(req, res, next)=>{
  Cause.create(req.body)
    .then(cause=>{
      //console.log(cause)
      res.redirect('/step3')
    }).catch(e=>next(e))
})

router.get('/causes', (req, res, next)=>{
  Cause.find()
    .then(cause=>{
      res.render('../views/home/causes.hbs', {cause})
    })
      })

router.get('/cDetail/:id',(req,res,next)=>{
  const {id} = req.params
  Cause.findById(id)
  .then(cause=>{
    console.log(cause)
    res.render('../views/home/cDetail.hbs', cause)
  })
})

module.exports = router