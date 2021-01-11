import * as actionTypes from './actionTypes';

// APP
export const setSomeData = data => {
  return {
    type: actionTypes.SET_SOME_DATA,
    data,
  };
};
