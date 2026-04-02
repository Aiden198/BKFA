var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('Volunteer');
});

module.exports = router;