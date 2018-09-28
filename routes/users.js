const router = require("express").Router();
const Cause = require("../models/Cause");
const Banka = require("../models/Banka");
const Donation = require("../models/Donation")
const uploadCloud = require("../helpers/cloudinary");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

router.get("/create",ensureAuthenticated, (req, res, next) => {
  res.render("../views/users/create.hbs");
});

router.post("/create", (req, res, next) => {
    Cause.create(req.body)
      .then(cause => {
        //console.log(cause)
        res.redirect(`/step2/${cause._id}`);
      })
      .catch(e => next(e));
      
  });

router.get("/step2/:id", (req, res, next) => {
  res.render("../views/users/step2", req.params);
});

router.post("/step2/:id", uploadCloud.single('photosUrl'), (req, res, next) => {
  if(req.file)req.body['photosUrl']= req.file.url
  //console.log(req.body)
  Cause.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(cause => {
      console.log(cause);
      res.redirect(`/step3/${cause._id}`);
    })
    .catch(e => next(e));
});

router.get("/step3/:id", (req, res, next) => {
  res.render("../views/users/step3",req.params);
});

router.post("/step3/:id", (req, res, next) => {
  Cause.findById(req.params.id)
  .then(cause=>{
   let bancaN = req.body
   bancaN.cause = cause._id
    Banka.create(bancaN)
    .then(bank => {

      console.log(bank)
      res.redirect('/causes');
    })
    .catch(e => console.log(e));  
  })
});

router.get("/step4/:id", (req, res, next) => {
  res.render("../views/users/step4");
});

router.post("/step4/:id", (req, res, next) => {
  Banka.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
  .then(bank => {
    console.log(bank);
      res.redirect(`/done/${bank.id}`);
    })
    .catch(e => next(e));
});

router.get("/done",(req,res,next)=>{
  res.render("../views/users/done.hbs")
})

router.get("/causes", (req, res, next) => {
  Cause.find().then(cause => {
    res.render("../views/home/causes.hbs", { cause });
  });
});

router.get("/cDetail/:id", (req, res, next) => {
  const { id } = req.params;
  Cause.findById(id).then(cause => {
    console.log(cause);
    res.render("../views/home/cDetail.hbs", cause);
  });
});

router.post("/cDetail/:id", (req, res, next) => {
  Cause.findById(req.params.id)
  .then(cause=>{
   //let donaN = req.body
   //donaN.c = donations._id
    Donation.create({user:req.user._id})
    .then(dona => {
      Cause.findByIdAndUpdate(req.params.id,{$push:{donations:dona._id}})
        .then(c=>{
          res.redirect(`/paymode/${dona.id}`);
        })  
      console.log(dona)
      
  })
    .catch(e => next(e));
}).catch(e=>next(e))
})


router.get("/paymode/:id", (req, res, next) => {
  const { id } = req.params;
  res.render("../views/home/paymode.hbs");
});

module.exports = router
