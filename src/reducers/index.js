import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authn from './authn';
import app from './app';
// import builder from './builder';
// import nav from './nav';
// import notifications from './notifications';
// import winCallEvent from './winCallEvent';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    authn,
    app,
    // builder,
    // nav,
    // notifications,
    // winCallEvent
  });
}