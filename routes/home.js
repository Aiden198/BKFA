var express = require('express');
var router = express.Router();
var path = require('path');

// These informational pages live at the site root rather than in a route group.
router.get('/', function(req, res) {
  res.render('home');
});

router.get('/privacypolicy', function(req, res) {
  res.render('PrivacyPolicy');
});

router.get('/twenty-years', function(req, res) {
  res.render('TwentyYears');
});

router.get([
  '/corporate-support',
  '/corporatesupport',
  '/CorporateSupport',
  '/Corporate-Support'
], function(req, res) {
  // Accept common spelling and casing variations for older external links.
  res.render('CorporateSupport');
});

// Preserve the original public Corporate Volunteering URL pattern as a redirect.
router.get('/corporate-volunteering', function(req, res) {
  res.redirect(301, '/volunteer/corporate-volunteering');
});

module.exports = router;
