import axios from 'axios';

axios.defaults.withCredentials = true;

let domain;
switch(process.env.NODE_ENV) {
  case 'production':
    domain = 'https://dev.auth.service.viewportmedia.org';
    break;
  case 'development':
    domain = '';
    break;
  default: // 'local':
    domain = '';
}

/**
 * This should be the register step
 * @param { email: String, emailLists:  } reqBody 
 * @description checks to see if user is already registered.
 * @todo register the email and sign them up for the news letter if
 * the email is not in the system register them with news letter settings.
 * Check to see if they are already registered and see if they have a password.
 * If not send them to the create password page.
 * If so send them to the login page.
 */
const registerUser = async (reqBody) => {
  try {
    const res = await axios.post(
      `${domain}/auth/register-user`,
      reqBody,
    );
    
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

/**
 * This should be the create account step
 * @param { email: String, password: String } reqBody 
 * @description creates database user entry.
 * @todo once they have a password, send them am email to verify their email address.
 * @todo take them to a getting started page...
 * @todo Docs, profile page and tell a friend...
 * 
 */
const createPassword = async (reqBody) => {
  try {
    const res = await axios.post(
      `${domain}/auth/create-password`,
      reqBody,
    );

    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const login = async (reqBody) => {
  try {
    const res = await axios.post(
      `${domain}/auth/login`,
      reqBody,
    );
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const signOut = async (reqBody) => {
  try {
    const res = await axios.post(
      `${domain}/auth/sign-out`,
      reqBody,
    );

    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const forgotPassword = async (reqBody) => {
  try {
    const res = await axios.post(
      `${domain}/auth/forgot-password`,
      reqBody,
    );

    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const validateReset = async (token) => {
  try {
    const res = await axios.get(`${domain}/auth/validate-reset/${token}`);

    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const resetPassword = async (token, reqBody) => {
  try {
    const res = await axios.post(
      `${domain}/auth/reset-password/${token}`,
      reqBody,
    );

    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const authn = async () => {
  try {
    const res = await axios.get(`${domain}/auth/authn`);
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export {
  registerUser,
  createPassword,
  login,
  forgotPassword,
  validateReset,
  resetPassword,
  signOut,
  authn,
};
