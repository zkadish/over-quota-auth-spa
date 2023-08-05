import { colors } from '../../styles/variables.styles';
import theme from '../../styles/theme';

const classes = {
  formControl: {
    display: 'block',
    margin: '0 0 9px',
    '.helper-text': {
      height: '19px',
      color: '#f44336;',
    },
  },
  loginButton: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400'
  },
  loginOptions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    margin: '0 0 24px',
    '.remember-me': {
      display: 'flex',
      margin: '0 0 24px',
      fontSize: '14px',
    },
    // '.switch-styles': {
    //   position: 'relative',
    //   // top: '2px',
    //   // border: '1px solid red',
    // }
  }
}

export default classes;