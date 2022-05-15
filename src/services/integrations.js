import axios from 'axios';

axios.defaults.withCredentials = true;

console.log(process.env.NODE_ENV);
let domain;
switch(process.env.REACT_APP_ENV) {
  case 'production':
    domain = 'https://dev.auth.service.overquota.io';
    break;
  case 'development':
    domain = 'http://localhost:7777';
    break;
  default: // 'local':
    domain = '';
}

const getGoogleCalendarAuthUrl = async () => {
  debugger
  try {
    const res = await axios.get(
      `${domain}/api/google/v1/calendar/auth`,
    );
    
    return res;
  } catch (error) {
    console.error(error);
    debugger
    return { error };
  }
}

const postGoogleCalendarAuthCode = async (reqBody) => {
  debugger
  try {
    const res = await axios.post(
      `${domain}/api/google/v1/calendar/auth`,
      reqBody,
    );

    return res;
  } catch (error) {
    console.error(error);
    debugger
    return { error };
  }
}

export { getGoogleCalendarAuthUrl, postGoogleCalendarAuthCode };
