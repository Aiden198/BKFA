var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/ourprojects', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/OurProjects.html'));
});

module.exports = router;