import AppLayout from '../Layout/AppLayout';
import { Paper, Box } from '@mui/material';
import Authn from '../../components/Authn';

const GoogleCalendarAuth = () => {
  return (
    <Authn>
      <AppLayout>
        <Paper>
          <Box>Google Calendar Auth</Box>
        </Paper>
      </AppLayout>
    </Authn>
  );
};

export default GoogleCalendarAuth;
