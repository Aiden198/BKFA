var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ourprojects', function(req, res) {
  res.render('OurProjects');
});

module.exports = router;