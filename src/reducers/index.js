import { combineReducers } from 'redux';
import authnReducer from '../features/authnSlice';
// import authn from './authn';
// import app from './app';
// import builder from './builder';
// import nav from './nav';
// import notifications from './notifications';
// import winCallEvent from './winCallEvent';

export default function rootReducer() {
  return combineReducers({
    authn: authnReducer,
    // app,
    // builder,
    // nav,
    // notifications,
    // winCallEvent
  });
}