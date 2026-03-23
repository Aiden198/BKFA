var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/Contact', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/Contact.html'));
});

module.exports = router;