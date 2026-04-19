var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/privacypolicy', function(req, res) {
  res.render('PrivacyPolicy');
});

router.get('/twenty-years', function(req, res) {
  res.render('TwentyYears');
});

module.exports = router;