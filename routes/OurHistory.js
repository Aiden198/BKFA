var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ourhistory', function(req, res) {
  res.render('OurHistory');
});

module.exports = router;