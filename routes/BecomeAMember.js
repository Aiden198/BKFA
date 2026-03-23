var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/becomeamember', function(req, res) {
  res.render('BecomeAMember');
});

module.exports = router;