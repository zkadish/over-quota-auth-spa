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

import classes from './Video.styles';

function Welcome() {
  return (
    <Authn>
      <AppLayout>
        <Paper>
          <Box sx={{ ...classes.video }}>
            <Typography className="title" variant="h2">Your Videos</Typography>
          </Box>
        </Paper>
      </AppLayout>
    </Authn>
  );
}

export default Welcome;
