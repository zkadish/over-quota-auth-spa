import { Switch, Route } from 'react-router-dom';
import AuthLayout from '../Layout/AuthLayout';
import AppLayout from '../Layout/App';
import RegisterUser from '../../components/RegisterUser';
import CreatePassword from '../../components/CreatePassword';
import ResetPassword from '../../components/ResetPassword';
import Login from '../../components/Login';
import Welcome from '../../containers/Welcome';
import ForgotPassword from '../../components/ForgotPassword';

import routes from '../../constants/routes';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={[routes.ROOT, routes.REGISTER_USER]}>
        <RegisterUser />
      </Route>
      <Route exact path={routes.CREATE_PASSWORD}>
        <CreatePassword />
      </Route>
      <Route exact path={routes.RESET_PASSWORD}>
        <ResetPassword />
      </Route>
      <Route exact path={routes.LOGIN}>
        <Login />
      </Route>
      <Route exact path={routes.FORGOT_PASSWORD}>
        <ForgotPassword />
      </Route>
      <Route exact path={[routes.APP, routes.WELCOME]}>
        <AppLayout>
          <Welcome />
        </AppLayout>
      </Route>
      <Route exact path="/*">
        <AuthLayout>
          404
        </AuthLayout>
      </Route>
    </Switch>
  );
};

export default Routes;
