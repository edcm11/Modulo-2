const router = require('express').Router()
const Cause = require('../models/Cause')

router.get('/create',(req,res,next)=>{
  res.render('../views/users/create.hbs')
})

router.post('/create',(req, res, next)=>{
  Cause.create(req.body)
    .then(cause=>{
      //console.log(cause)
      res.redirect('/causes')
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

// router.get('/detail/:id',(req, res, next)=>{
//   const {id} = req.params
//   Book.findById(id)
//     .populate('reviews')
//     .then(book=>{
//       console.log(book)
//       res.render('book-detail',book)
//     }).catch(e=>{
//       console.log(e)
//       next(e)
//     })
// })

module.exports = router