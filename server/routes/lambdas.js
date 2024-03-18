var express = require('express');
var router = express.Router();
var listLambdas = require('../lambdas/list-functions');
var invokeLambda = require('../lambdas/invoke-function')

/* GET list of lambda functions route */
router.get('/list-functions', async (req, res, next) => {
  const functions = await listLambdas();
  res.send(functions);
});

router.post('/invoke-function', async (req, res, next) => {
  const {functionName, payload} = req.body;
  const functions = await invokeLambda(functionName, payload);
  res.send(functions);
});

// /* GET test AWS Lambda */
// router.get('/hello-lambda', async (req, res, next) => {
//   const functions = await helloLambda();
//   res.send(`test hello lambda route: ${functions}`);
// });

module.exports = router;
