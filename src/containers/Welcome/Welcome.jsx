import {
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';

import './Welcome.scss';

const cardsStyles = makeStyles({
  root: {
    width: `200px`,
    minHeight: `260px`,
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
  const classesCards = cardsStyles();

  return (
    <div className="welcome">
      <Typography variant="h2">Welcome to SkillUp!</Typography>
      <Typography>Welcome message...</Typography>
      <div className="welcome__actions">
        <div>
          <Card className={classesCards.root}>
            <CardContent>
              <a href="assets/test.txt" download="test">
                <IconButton>
                  <GetAppIcon className={classesCards.icon}/>
                </IconButton>
              </a>
              <div>
                Download the latest version of SkillUp...
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className={classesCards.root}>
            <CardContent>
              <IconButton>
                <AccountBoxSharpIcon className={classesCards.icon}/>
              </IconButton>
            </CardContent>
            <div>
                Manage your account...
              </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
