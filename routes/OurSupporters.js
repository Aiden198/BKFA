var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('OurSupporters');
});

router.get('/zontaclub', function(req, res) {
  res.render('ZontaClub');
});

router.get('/rotaryinternational', function(req, res) {
  res.render('RotaryInternational');
});

router.get('/srisathyasai', function(req, res) {
  res.render('SriSathyaSai');
});

module.exports = router;