import { colors } from '../../styles/variables.styles';
import theme from '../../styles/theme';

const classes = {
  expiredLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '.expiredLink-text': {
      fontWeight: 'bold',
      margin: '0 0 24px',
    }
  },
  formControl: {
    display: 'block',
    margin: '0 0 24px',
    '.password-icon': {
      marginRight: '-14px',
      padding: '6px 12px',
      borderRadius: '0 4px 4px 0',
    }
  },
  formControlConfirm: {
    display: 'block',
    margin: '0 0 5px',
    '.password-icon': {
      marginRight: '-14px',
      padding: '6px 12px',
      borderRadius: '0 4px 4px 0',
    },
    '.helper-text': {
      height: '19px',
      color: '#f44336;',
    },
  },
  formControlError: {
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#f44336;',
    }
  },
  buttonStyles: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400',
  },
  popperStyles: {
    zIndex: 1,
    width: '400px',
    '.popperStyles-paper': {
      padding: theme.spacing(2),
    }
  },
  bulletStyles: {
    width: '10px',
    height: '10px',
  },
  bulletWarn: {
    color: 'orange',
  },
  bulletValidated: {
    color: 'green',
  }
}

export default classes;
