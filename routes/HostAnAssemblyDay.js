var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/HostAnAssemblyDay', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/HostAnAssemblyDay.html'));
});

module.exports = router;