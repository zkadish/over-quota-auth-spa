import axios from 'axios';


const getGoogleCalendarAuthUrl = async () => {
  debugger
  try {
    const res = await axios.get(
      '/api/google/v1/calendar/auth',
    );
    
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

const postGoogleCalendarAuthCode = async (reqBody) => {
  debugger
  try {
    const res = await axios.post(
      '/api/google/v1/calendar/auth',
      reqBody,
    );
    
    return res;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export { getGoogleCalendarAuthUrl, postGoogleCalendarAuthCode };
