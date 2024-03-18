import axios from 'axios';

axios.defaults.withCredentials = true;

console.log(process.env.NODE_ENV);
let domain;
switch(process.env.REACT_APP_ENV) {
  case 'production':
    domain = 'https://dev.auth.service.viewportmedia.org';
    break;
  case 'development':
    // domain = 'http://localhost:7777';
    domain = '';
    break;
  default: // 'local':
    domain = '';
}

const getAwsLambdaFunctions = async () => {
  try {
    const res = await axios.get(
      `${domain}/test/hello-lambda`,
    );
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const listLambdaFunctions = async () => {
  try {
    const res = await axios.get(
      `${domain}/lambdas/list-functions`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const invokeLambdaFunction = async (body) => {
  try {
    const res = await axios.post(
      `${domain}/lambdas/invoke-function`,
      body,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export { getAwsLambdaFunctions, listLambdaFunctions, invokeLambdaFunction };