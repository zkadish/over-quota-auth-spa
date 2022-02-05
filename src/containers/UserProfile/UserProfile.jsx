import AppLayout from '../Layout/AppLayout';
import { Paper } from '@material-ui/core';
import Authn from '../../components/Authn';

const UserProfile = () => {
  return (
    <Authn>
      <AppLayout>
        <Paper>
          <div>User Profile</div>
        </Paper>
      </AppLayout>
    </Authn>
  );
};

export default UserProfile;
