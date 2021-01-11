import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
// import builder from './builder';
// import nav from './nav';
// import notifications from './notifications';
// import winCallEvent from './winCallEvent';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    app,
    // builder,
    // nav,
    // notifications,
    // winCallEvent
  });
}