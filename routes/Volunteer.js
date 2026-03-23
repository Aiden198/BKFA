var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/volenteer', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/Volenteer.html'));
});

module.exports = router;