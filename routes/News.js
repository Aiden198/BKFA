var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/news', function(req, res) {
  res.render('News');
});

module.exports = router;