var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/faq', function(req, res) {
  res.render('FAQ');
});

module.exports = router;