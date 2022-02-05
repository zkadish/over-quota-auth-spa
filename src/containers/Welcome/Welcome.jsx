import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import AppLayout from '../Layout/AppLayout';
import Authn from '../../components/Authn';

import './Welcome.scss';

const containerStyles = makeStyles({
  textAlign: 'center',
});

const typographyStyles = makeStyles({
  title: {
    margin: '24px 0',
  },
  message: {
    margin: '0 24px 0 0',
  },
});

const cardsStyles = makeStyles({
  root: {
    width: `220px`,
    minHeight: `260px`,
  },
  contentIcon: {
    textAlign: 'center',
  },
  icon: {
    width: '100px',
    height: '100px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {
  const classesContainer = containerStyles();
  const classesCards = cardsStyles();
  const classesTypography = typographyStyles();

  return (
    <Authn>
      <AppLayout>
        <Paper>
          <div className="welcome">
            <Typography className={classesTypography.title} variant="h2">Welcome to SkillUp!</Typography>
            <Typography className={classesTypography.message}>Welcome message...</Typography>
            <div className="welcome__actions">
              <Card className={classesCards.root}>
                <CardContent>
                  <div className={classesCards.contentIcon}>
                    <a href="assets/test.txt" download="test">
                      <IconButton>
                        <GetAppIcon className={classesCards.icon}/>
                      </IconButton>
                    </a>
                  </div>
                  <div>
                    Download the latest version of OverQuota...
                  </div>
                </CardContent>
              </Card>
              <Card className={classesCards.root}>
                <CardContent>
                  <div className={classesCards.contentIcon}>
                    <IconButton>
                      <AccountBoxSharpIcon className={classesCards.icon}/>
                    </IconButton>
                  </div>
                  <div>
                    Manage your account...
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Paper>
      </AppLayout>
    </Authn>
  );
}

export default App;
