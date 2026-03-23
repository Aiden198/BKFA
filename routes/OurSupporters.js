var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/oursupporters', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/OurSupporters.html'));
});

module.exports = router;