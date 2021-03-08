import { Switch, Route } from 'react-router-dom';
import AuthLayout from '../Layout/AuthLayout';
import Authn from '../../components/Authn';
// import AppLayout from '../Layout/App';
import RegisterUser from '../../components/RegisterUser';
import CreatePassword from '../../components/CreatePassword';
import ResetPassword from '../../components/ResetPassword';
import Login from '../../components/Login';
import ForgotPassword from '../../components/ForgotPassword';

import Welcome from '../../containers/Welcome';
import UserProfile from '../../containers/UserProfile';

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
        <Authn>
          <Welcome />
        </Authn>
      </Route>
      <Route exact path={routes.USER_PROFILE}>
        <Authn>
          <UserProfile />
        </Authn>
      </Route>
      <Route exact path="/*">
        {/* TODO: create a 404 component */}
        <AuthLayout>
          404
        </AuthLayout>
      </Route>
    </Switch>
  );
};

export default Routes;
