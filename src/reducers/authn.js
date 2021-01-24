import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
};

export default function authn(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
