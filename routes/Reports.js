var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/reports', function(req, res) {
  res.render('Reports');
});

module.exports = router;