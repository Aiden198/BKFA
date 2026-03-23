var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/CleanBirthKits', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/CleanBirthKits.html'));
});

module.exports = router;