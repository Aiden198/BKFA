var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/resources', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/Resources.html'));
});

module.exports = router;