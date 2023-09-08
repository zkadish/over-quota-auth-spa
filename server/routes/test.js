var express = require('express');
var router = express.Router();

/* GET test route */
router.get('/', function(req, res, next) {
  res.send('test routes');
});

module.exports = router;
