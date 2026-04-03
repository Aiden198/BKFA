var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('Volunteer');
});

router.get('/kitsathome', function(req, res) {
  res.render('KitsAtHome');
});

router.get('/hostanassemblyday', function(req, res) {
  res.render('HostAnAssemblyDay');
});

router.get('/babyshowers', function(req, res) {
  res.render('BabyShowers');
});

module.exports = router;
