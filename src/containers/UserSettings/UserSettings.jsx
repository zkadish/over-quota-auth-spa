import { useEffect } from 'react';
import AppLayout from '../Layout/AppLayout';
import {
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Authn from '../../components/Authn';
import {
  getGoogleCalendarAuthUrl,
  postGoogleCalendarAuthCode,
} from '../../services/integrations';
import './UserSettings.scss';

const typographyStyles = makeStyles({
  title: {
    padding: '24px 0',
  },
  subTitle: {
    padding: '24px 0',
  },
  message: {
    margin: '0 24px 0 0',
  },
});



const UserSettings = props => {
  const { user } = props;
  const classesTypography = typographyStyles();

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
          <div className="user-settings">
            <Typography className={classesTypography.title} variant="h2">User Settings</Typography>
            <Typography className={classesTypography.subTitle} variant="h5">Google Calendar Integration</Typography>
            <span className="authorize-btn">
              <Button
                variant="contained"
                color="primary"
                onClick={onGoogleCalendarAuthorize}
              >
                Authorize
              </Button>
            </span>
            <Button variant="contained" color="primary">remove authorization</Button>
          </div>
        </Paper>
      </AppLayout>
    </Authn>
  );
};
export default UserSettings;
