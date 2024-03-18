import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './containers/Root';
import configureAppStore from './store/configStore';

import 'html5-boilerplate/dist/css/normalize.css';
import 'html5-boilerplate/dist/css/main.css';

import reportWebVitals from './reportWebVitals';

const store = configureAppStore();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
