import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import routes from '../../constants/routes';
import { authn } from '../../services/authn';
import { setUser } from '../../features/authnSlice';


const Authn = props => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authn.user);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authn().then(res => {
      const { data, error } = res;
      if (error) {
        // TODO: throw up a message modal you are no longer authenticated sign back in...
        // you will be redirected in 5... 4... 3... 2... 1... 
        navigate(routes.LOGIN);
        return;
      }
      if (data?.authenticated) {
        setAuthenticated(true);
        if (!user) {
          dispatch(setUser(data.user));
        }
        return;
      }
    });
  }, [location, user]);

  return (
    <>
      {authenticated && children}
    </>
  );
};

export default Authn;
