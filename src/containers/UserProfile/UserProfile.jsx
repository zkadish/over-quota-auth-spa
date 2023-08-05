import AppLayout from '../Layout/AppLayout';
import { Paper } from '@mui/material';
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
