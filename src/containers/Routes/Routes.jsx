import { Switch, Route } from 'react-router-dom';
import Auth from '../Layout/Auth';
import AppLayout from '../Layout/App';
import RegisterUser from '../../components/RegisterUser';
import CreatePassword from '../../components/CreatePassword';
import Login from '../../components/Login';
import Welcome from '../../containers/Welcome';
import ForgotPassword from '../../components/ForgotPassword';

import routes from '../../constants/routes';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={[routes.ROOT, routes.REGISTER_USER]}>
        <Auth>
          <RegisterUser />
        </Auth>
      </Route>
      <Route exact path={routes.CREATE_PASSWORD}>
        <Auth>
          <CreatePassword />
        </Auth>
      </Route>
      <Route exact path={routes.LOGIN}>
        <Auth>
          <Login />
        </Auth>
      </Route>
      <Route exact path={routes.FORGOT_PASSWORD}>
        <Auth>
          <ForgotPassword />
        </Auth>
      </Route>
      <Route exact path={[routes.APP, routes.WELCOME]}>
        <AppLayout>
          <Welcome />
        </AppLayout>
      </Route>
      <Route exact path="/*">
        <Auth>
          404
        </Auth>
      </Route>
    </Switch>
  );
};

export default Routes;
