import { Switch, Route } from 'react-router-dom';
import { Auth } from '../Layout';
import RegisterUser from '../../components/RegisterUser';
import CreatePassword from '../../components/CreatePassword';
import Login from '../../components/Login';

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
    </Switch>
  );
};

export default Routes;
