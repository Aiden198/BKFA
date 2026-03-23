var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/FAQ', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/FAQ.html'));
});

module.exports = router;