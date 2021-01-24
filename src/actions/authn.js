import * as actionTypes from './actionTypes';

// APP
export const setUserData = user => {
  return {
    type: actionTypes.SET_USER_DATA,
    user,
  };
};