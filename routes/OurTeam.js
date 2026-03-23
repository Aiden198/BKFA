var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ourteam', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/OurTeam.html'));
});

module.exports = router;