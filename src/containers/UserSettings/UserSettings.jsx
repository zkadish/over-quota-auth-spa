import { useEffect } from 'react';
import AppLayout from '../Layout/AppLayout';
import {
  Box,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import Authn from '../../components/Authn';
import {
  getGoogleCalendarAuthUrl,
  postGoogleCalendarAuthCode,
} from '../../services/integrations';

const UserSettings = props => {
  const { user } = props;

  useEffect(() => {
    const { href } = window.location;
    if (user && href.includes('?code=') && href.includes('&scope=')) {
      const startIndex = href.indexOf('?code=') + 6;
      const endIndex = href.indexOf('&scope=');
      const code = href.slice(startIndex, endIndex);
      debugger
      // TODO: send user with auth code
      postGoogleCalendarAuthCode({ user, code });
      // window.location.search = "";
    }
  }, [user]);

  const onGoogleCalendarAuthorize = () => {
    getGoogleCalendarAuthUrl().then(res => {
      console.log(res);
      debugger;
      // window.open(res.data.googleCalendarRedirectUrl, '_blank');
      window.location.href = res.data.googleCalendarRedirectUrl;
    }).catch((err) => {
      console.log(err);
      debugger;
    })
  };

  return (
    <Authn>
      <AppLayout pageTitle="OverQuota - User Settings">
        <Paper>
          <Box sx={{ padding: '0 24px 24px' }}>
            <Typography sx={{ padding: '24px 0' }} variant="h2">User Settings</Typography>
            <Typography sx={{ padding: '24px 0' }} variant="h5">Google Calendar Integration</Typography>
            <Box component="span" sx={{ margin: '0 16px 0 0' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={onGoogleCalendarAuthorize}
              >
                Authorize
              </Button>
            </Box>
            <Button variant="contained" color="primary">remove authorization</Button>
          </Box>
        </Paper>
      </AppLayout>
    </Authn>
  );
};
export default UserSettings;
