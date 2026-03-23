var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ourhistory', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/OurHIstory.html'));
});

module.exports = router;