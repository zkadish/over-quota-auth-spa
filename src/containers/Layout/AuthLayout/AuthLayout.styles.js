import { colors } from '../../../styles/variables.styles';

const classes = {
  authLayout: {
    '.authLayout-header': {
      display: 'flex',
      justifyContent: 'flex-end',
      height: '64px',
      backgroundColor: colors.BACKGROUND_PRIMARY_DARK,
      color: 'white',
    },
    '.icon-button': {
      color: '#fff',
      '& .MuiSvgIcon-root': {
        width: '40px',
        height: '40px',
      },
    },
    '.authLayout-main': {
      display: 'flex',
      justifyContent: 'center',
      height: 'calc(100vh - 120px)',
      width: '100vw',
      overflow: 'auto',
    },
    '.auth-form': {
      maxWidth: '400px',
      width: '100%',
      backgroundColor: colors.BACKGROUND_PRIMARY_LIGHT,
      '.auth-form-logo': {
        padding: '24px 0 8px',
        fontSize: '32px',
        fontWeight: 'bold',
      },
      '.auth-form-message': {
        '& div:nth-child(1)': {
          padding: '0 0 16px 0',
          fontSize: '36px',
          fontWeight: 'bold',
        },
        '& div:nth-child(2)': {
          padding: '0 0 24px 0',
        }
      },
      '.auth-form-policy': {
        padding: '0 0 40px',
        textAlign: 'left',
        fontSize: '14px',
      },
    },
    '.auth-form-footer': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: '0',
      height: '64px',
      width: '100vw',
      backgroundColor: colors.BACKGROUND_PRIMARY_DARK,
      color: 'white',
    }
  },
}

export default classes;
