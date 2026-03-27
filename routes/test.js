var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/test', function(req, res) {
  res.render('test');
});

module.exports = router;