var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/resources', function(req, res) {
  res.render('Resources');
});

module.exports = router;