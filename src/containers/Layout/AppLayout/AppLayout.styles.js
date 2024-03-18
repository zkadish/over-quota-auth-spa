import { colors } from '../../../styles/variables.styles';
import theme from '../../../styles/theme';

const classes = {
  appLayout: {
    '.profile-icon-button': {
      color: '#fff',
      '& .MuiSvgIcon-root': {
        width: '40px',
        height: '40px',
      },
    },
    '.app-content': {
      position: 'relative',
      top: '64px',
      flexGrow: 1,
      padding: theme.spacing(3),
      overflow: 'auto',
    },
    '.app-footer': {
      position: 'fixed',
      bottom: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '64px',
      width: '100vw',
      backgroundColor: '#282c34',
      color: 'white',
      fontSize: '16px',
    }
  },
}

export default classes;