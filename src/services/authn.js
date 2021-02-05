import axios from 'axios';

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
      '/api/auth/register-user',
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
      '/api/auth/create-password',
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
      '/api/auth/login',
      reqBody,
    );

    return res;
  } catch (error) {
    console.log.error(error);
    return { error };
  }
}

export {
  registerUser,
  createPassword,
  login,
};
