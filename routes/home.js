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

// Preserve the original public Corporate Volunteering URL pattern as a redirect.
router.get('/corporate-volunteering', function(req, res) {
  res.redirect(301, '/volunteer/corporate-volunteering');
});

module.exports = router;
