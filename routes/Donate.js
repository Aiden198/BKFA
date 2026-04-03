var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('Donate');
});

router.get('/fundraise', function(req, res) {
  res.render('Fundraise');
});

router.get('/agiftinyourwill', function(req, res) {
  res.render('AGiftInYourWill');
});

module.exports = router;