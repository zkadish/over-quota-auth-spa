import { colors } from '../../styles/variables.styles';
import theme from '../../styles/theme';

const classes = {
  formControl: {
    display: 'block',
    margin: '0 0 9px',
    '.helper-text': {
      height: '19px',
    },
    '.adornment': {
      marginLeft: 0,
    },
    '.password-icon': {
      marginRight: '-14px',
      padding: '6px 12px',
      borderRadius: '0 4px 4px 0',
    },
  },
  buttonStyles: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400'
  },
  loginOptions: {
    textAlign: 'center',
    margin: '0 0 16px',
    '.link': {
      margin: '16px 0 16px',
    },
    '.remember-me': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      margin: '0 0 16px',
    }
  }
}

export default classes;
