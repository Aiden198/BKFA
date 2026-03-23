var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/becomeamember', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/BecomeAMember.html'));
});

module.exports = router;