import { useEffect, useState } from 'react';
import routes from '../../constants/routes';
import { authn } from '../../services/authn';

const Authn = props => {
  const { history, children } = props;

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authn().then(res => {
      const { data, error } = res;

      if (data?.authenticated) setAuthenticated(true);
      if (error) {
        // TODO: throw up a message modal you are no longer authenticated sign back in...
        // you will be redirected in 5... 4... 3... 2... 1... 
        history.push(routes.LOGIN);
      }
    });
  }, [history]);

  return (
    <>
      {authenticated && children}
    </>
  );
};

export default Authn;
