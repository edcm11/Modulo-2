const router = require("express").Router();
const Cause = require("../models/Cause");
const Banka = require("../models/Banka");
const uploadCloud = require("../helpers/cloudinary");

router.get("/create", (req, res, next) => {
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

router.post("/step2/:id", uploadCloud.single("fhoto"), (req, res, next) => {
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
      res.redirect(`/step4/${bank.id}`);
    })
    .catch(e => console.log(e));  
  })
});

router.get("/step4/:id", (req, res, next) => {
  res.render("../views/users/step4");
});

router.post("/step4/:id", (req, res, next) => {
  Banka.create(req.body)
    .then(bank => {
      //console.log(cause)
      res.redirect(`/done/${bank._id}`);
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

router.get("/paymode", (req, res, next) => {
  res.render("../views/home/paymode.hbs");
});

module.exports = router;
