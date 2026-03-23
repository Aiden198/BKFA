var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/hostanassemblyday', function(req, res) {
  res.render('HostAnAssemblyDay');
});

module.exports = router;