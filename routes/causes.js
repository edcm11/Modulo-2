const router = require('express').Router()
const Cause = require('../models/Cause')

router.get('/causes', (req, res, next)=>{
  const {search} = req.query
  if(search){
    Cause.find({title:{$regex : search, $options:'i'}})
    .then(causes=>{
      res.render('/causes',{causes})
    }).catch(e=>next(e))
  }else{
    Cause.find()
      .then(causes=>{
        console.log(causes)
        res.render('home/causes',{causes})
      })
  }
})

module.exports = router