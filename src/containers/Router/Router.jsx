import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../Layout/AuthLayout';
// import Authn from '../../components/Authn';
// import AppLayout from '../Layout/App';
import RegisterUser from '../../components/RegisterUser';
import CreatePassword from '../../components/CreatePassword';
import ResetPassword from '../../components/ResetPassword';
import Login from '../../components/Login';
import ForgotPassword from '../../components/ForgotPassword';

import Welcome from '../../containers/Welcome';
import UserProfile from '../../containers/UserProfile';
import UserSettings from '../../containers/UserSettings';
import GoogleCalendarAuth from '../../containers/GoogleCalendarAuth';
import Error404 from '../../components/Error404';

import routes from '../../constants/routes';

const Router = () => {
  return (
    <Routes>
      <Route exact path={routes.ROOT} element={<RegisterUser />} />
      <Route exact path={routes.REGISTER_USER} element={<RegisterUser />} />
      <Route exact path={routes.CREATE_PASSWORD} element={<CreatePassword />} />
      <Route exact path={routes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route exact path={routes.LOGIN} element={<Login />} />
      <Route exact path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route exact path={routes.WELCOME} element={<Welcome />} />
      <Route exact path={routes.USER_PROFILE} element={<UserProfile />} />
      <Route exact path={routes.USER_SETTINGS} element={<UserSettings />} />
      <Route exact path={routes.GOOGLE_CALENDAR_AUTH} element={<GoogleCalendarAuth />} />
      <Route exact path="/*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
