var express = require('express');
var router = express.Router();
var path = require('path');

/* GET pisslott listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/pisslott2.html'));
});

module.exports = router;
