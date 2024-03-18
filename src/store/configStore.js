// import configStoreDev from './configStore.dev';
// import configStoreProd from './configStore.prod';
// import monitorReducersEnhancer from './enhancers/monitorReducers'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';

const reducer = rootReducer();

// Logging Middleware
const logger = createLogger({
  level: 'info',
  collapsed: true
});

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger),
    preloadedState,
    // enhancers: (getDefaultEnhancers) =>
    //   getDefaultEnhancers().concat(monitorReducersEnhancer),
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
  }

  return store;
}

