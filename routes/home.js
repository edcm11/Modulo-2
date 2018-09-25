const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('home/home');
});

router.get('/aboutus', (req, res, next) => {
  res.render('home/aboutus');
});

// router.get('/causes', (req, res, next) => {
//   res.render('home/causes');
// });

router.get('/help', (req, res, next) => {
  res.render('home/help');
});
module.exports = router;
