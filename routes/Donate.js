var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('Donate');
});

router.get('/Fundraise', function(req, res) {
  res.render('Fundraise');
});

router.get('/AGiftInYourWill', function(req, res) {
  res.render('AGiftInYourWill');
});


module.exports = router;