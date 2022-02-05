import { useEffect, useState } from 'react';
import routes from '../../constants/routes';
import { authn } from '../../services/authn';
import { useNavigate } from "react-router-dom";

const Authn = props => {
  const { setUserData, children } = props;
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authn().then(res => {
      const { data, error } = res;

      if (data?.authenticated) {
        setAuthenticated(true);
        setUserData(data.user);
      }
      if (error) {
        // TODO: throw up a message modal you are no longer authenticated sign back in...
        // you will be redirected in 5... 4... 3... 2... 1... 
        navigate(routes.LOGIN);
      }
    });
  }, [navigate, setUserData]);

  return (
    <>
      {authenticated && children}
    </>
  );
};

export default Authn;
