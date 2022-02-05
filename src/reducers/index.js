import { combineReducers } from 'redux';
import authn from './authn';
import app from './app';
// import builder from './builder';
// import nav from './nav';
// import notifications from './notifications';
// import winCallEvent from './winCallEvent';

export default function createRootReducer() {
  return combineReducers({
    authn,
    app,
    // builder,
    // nav,
    // notifications,
    // winCallEvent
  });
}