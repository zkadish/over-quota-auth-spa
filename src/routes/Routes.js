import React from 'react';
import { Switch, Route } from 'react-router-dom';
import route from '../constants/routes.json';
import App from '../containers/App';
// import PasswordReset from '../components/PasswordReset';
// import Login from '../containers/Login';

const Routes = () => {
  return (
    <Switch>
      <Route path={route.APP} component={App} />
      {/* <Route path={route.PASSWORD_RESET} component={PasswordReset} />
      <Route path={route.LOGIN} component={Login} /> */}
    </Switch>
  );
};

export default Routes;