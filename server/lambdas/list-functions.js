// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');

/** snippet-start:[javascript.v3.lambda.actions.ListFunctions] **/
const listFunctions = async () => {
  const client = new LambdaClient({});
  const command = new ListFunctionsCommand({});
  const list = await client.send(command);
  const functionNames = list.Functions.map((lambda) => lambda.FunctionName).join(', ');
  return functionNames;
};
/** snippet-end:[javascript.v3.lambda.actions.ListFunctions] */

module.exports = listFunctions;
