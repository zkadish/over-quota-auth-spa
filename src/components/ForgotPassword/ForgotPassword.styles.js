import { colors } from '../../styles/variables.styles';
import theme from '../../styles/theme';

const classes = {
  formControl: {
    display: 'block',
    margin: '0 0 9px',
    '.helper-text': {
      height: '19px',
    },
    '.dialog': {
      '& .MuiDialog-paperWidthSm': {
        maxWidth: '400px',
      }
    },
    '.dialog-title': {
      '& .MuiTypography-h6': {
        fontSize: '36px',
        fontWeight: 'bold',
      }
    },
    '.dialog-content': {
      fontSize: '20px',
      fontWeight: 'bold',
    }
  },
  formControlLink: {
    margin: '0 0 24px',
    textAlign: 'center',
  },
  loginButton: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400'
  }
}

export default classes;
