import { createMuiTheme } from '@material-ui/core/styles';
// import { orange, red } from '@material-ui/core/colors';
import * as scss from './_variables.scss';

const theme = createMuiTheme({
  overrides: {
    MuiButtonBase: {
      root: {
        // backgroundColor: 'rgba(255, 255, 255, .3)'
      }
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px'
          }
        }
      },
      input: {
        padding: '8.5px 14px'
      },
      multiline: {
        padding: '8.5px 14px'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 11px) scale(1)'
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: scss.BACKGROUND_PRIMARY_LIGHT
      }
    },
    MuiAppBar: {
      colorPrimary: {}
    },
    MuiTabs: {
      indicator: {
        height: '4px'
      }
    }
  }
  // use the following style directly
  // by passing them through makeStyles
  // colorPrimary: {
  //   color: 'red'
  // },
  // status: {
  //   danger: '#ffffff'
  // }
});

export default theme;
