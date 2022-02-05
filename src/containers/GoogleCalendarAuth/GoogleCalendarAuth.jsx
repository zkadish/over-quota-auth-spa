import AppLayout from '../Layout/AppLayout';
import { Paper } from '@material-ui/core';
import Authn from '../../components/Authn';

const GoogleCalendarAuth = () => {
  return (
    <Authn>
      <AppLayout>
        <Paper>
          <div>Google Calendar Auth</div>
        </Paper>
      </AppLayout>
    </Authn>
  );
};

export default GoogleCalendarAuth;
