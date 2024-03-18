// var { fileURLToPath } = require('url');

// snippet-start:[javascript.v3.lambda.hello]
var { LambdaClient, paginateListFunctions } = require('@aws-sdk/client-lambda');

const client = new LambdaClient({});

const helloLambda = async () => {
  const paginator = paginateListFunctions({ client }, {});
  const functions = [];

  for await (const page of paginator) {
    const funcNames = page.Functions.map((f) => f.FunctionName);
    functions.push(...funcNames);
  }

  console.log("Functions:");
  console.log(functions.join("\n"));
  return functions;
};
// snippet-end:[javascript.v3.lambda.hello]

// Invoke main function if this file was run directly.
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   helloLambda();
// }

module.exports = helloLambda;