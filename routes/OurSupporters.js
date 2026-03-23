var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/oursupporters', function(req, res) {
  res.render('OurSupporters');
});

module.exports = router;