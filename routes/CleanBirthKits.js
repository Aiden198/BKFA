var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.render('CleanBirthKits');
});

router.get('/buyassembledkits', function(req, res) {
  res.render('BuyAssembledKits');
});

module.exports = router;