var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/Donate', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/Donate.html'));
});

module.exports = router;