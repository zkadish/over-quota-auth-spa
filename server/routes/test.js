var express = require('express');
var router = express.Router();
var helloLambda = require('../lambdas/hello')

/* GET test route */
router.get('/', function(req, res, next) {
  res.send('test routes');
});

/* GET test AWS Lambda */
router.get('/hello-lambda', async (req, res, next) => {
  const functions = await helloLambda();
  res.send(`test hello lambda route: ${functions}`);
});

module.exports = router;
