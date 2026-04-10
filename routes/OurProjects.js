var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('OurProjects');
});

router.get('/fieldpartners', function(req, res) {
  res.render('FieldPartners');
});

router.get('/ourachievements', function(req, res) {
  res.render('OurAchievements');
});

module.exports = router;