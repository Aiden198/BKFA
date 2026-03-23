var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/donate', function(req, res) {
  res.render('Donate');
});

module.exports = router;