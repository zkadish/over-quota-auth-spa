import * as actionTypes from '../actions/actionTypes';

const initialState = {
  data: null,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SOME_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
