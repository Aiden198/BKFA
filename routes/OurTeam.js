var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ourteam', function(req, res) {
  res.render('OurTeam');
});

module.exports = router;