var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/cleanbirthkits', function(req, res) {
  res.render('CleanBirthKits');
});

module.exports = router;