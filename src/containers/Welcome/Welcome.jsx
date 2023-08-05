import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import AppLayout from '../Layout/AppLayout';
import Authn from '../../components/Authn';

import classes from './Welcome.styles';

function Welcome() {
  return (
    <Authn>
      <AppLayout>
        <Paper>
          <Box sx={{ ...classes.welcome }}>
            <Typography className="title" variant="h2">Welcome to OverQuota!</Typography>
            <Typography className="message">Welcome message...</Typography>
            <Box className="actions">
              <Card className="card">
                <CardContent>
                  <Box className="contentIcon">
                    <a href={`${window.location.origin}/assets/OverQuota-1.0.0.dmg`} download>
                      <IconButton>
                        <GetAppIcon className="icon" />
                      </IconButton>
                    </a>
                  </Box>
                  <Box>
                    Download the latest version of OverQuota...
                  </Box>
                </CardContent>
              </Card>
              <Card className="card">
                <CardContent>
                  <Box className="contentIcon">
                    <IconButton>
                      <AccountBoxSharpIcon className="icon" />
                    </IconButton>
                  </Box>
                  <Box>
                    Manage your account...
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Paper>
      </AppLayout>
    </Authn>
  );
}

export default Welcome;
