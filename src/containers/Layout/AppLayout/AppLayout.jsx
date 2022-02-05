import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import { signOut } from '../../../services/authn';
import routes from '../../../constants/routes';
import Helmet from 'react-helmet';

import './AppLayout.scss';

const iconButtonStyles = makeStyles(() => ({
  root: {
    color: '#fff',
    '& .MuiSvgIcon-root': {
      width: '40px',
      height: '40px',
    },
  },
}));

const drawerWidth = 240;
const drawerStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // border: '1px solid red',
    // position: 'static',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // toolbar: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    position: 'absolute',
    top: '64px',
    bottom: '64px',
    left: '73px',
    flexGrow: 1,
    padding: theme.spacing(3),
    width: 'calc(100% - 73px)',
    overflow: 'auto',
    border: '1px solid red',
  },
}));

const AppLayout = props => {
  const { setUserData, user, children, pageTitle } = props;

  const theme = useTheme();
  const iconButtonClasses = iconButtonStyles();
  const drawerClasses = drawerStyles();

  const navigate = useNavigate();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSettings = () => {
    setAnchorMenu(null);
    navigate(routes.USER_SETTINGS);
  }

  const onProfile = () => {
    setAnchorMenu(null);
    navigate(routes.USER_PROFILE);
  }

  const onSignOut = () => {
    setAnchorMenu(null);
    navigate(routes.LOGIN);

    signOut({ email: user.email }).then(res => {
      const { data } = res;
      setUserData(null);
      // console.log(data);s
      // debugger
      // TODO: update user and clear access token
      // do something on signout success???
    });
  }

  return (
    <>
    <Helmet>
      <title>{pageTitle}</title>
      </Helmet>
      <div className="app-layout">
        <AppBar
          className={clsx(drawerClasses.appBar, {
            [drawerClasses.appBarShift]: open,
          })}
        >
          <Toolbar className={drawerClasses.toolbar}>
            <IconButton
              onClick={handleDrawerOpen}
              className={iconButtonClasses.root}
            >
              <ChatIcon />
            </IconButton>
            <IconButton
              className={iconButtonClasses.root}
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorMenu}
              keepMounted
              open={Boolean(anchorMenu)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={onSettings}>Settings</MenuItem>
              <MenuItem>Account</MenuItem>
              <MenuItem onClick={onProfile}>Profile</MenuItem>
              <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(drawerClasses.drawer, {
            [drawerClasses.drawerOpen]: open,
            [drawerClasses.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [drawerClasses.drawerOpen]: open,
              [drawerClasses.drawerClose]: !open,
            }),
          }}
        >
          <div className={drawerClasses.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* <ListItem>
              <ListItemIcon><GetAppIcon /></ListItemIcon>
              <ListItemText>Welcome</ListItemText>
            </ListItem> */}
            <ListItem>
              <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
              <ListItemText>Purchase</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon><GetAppIcon /></ListItemIcon>
              <ListItemText>Downloads</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText>App Settings</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
              <ListItemText>Support</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon><MailOutlineIcon /></ListItemIcon>
              <ListItemText>Contact Us</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main className={drawerClasses.content}>
          {/* <div className={drawerClasses.toolbar} /> */}
          {/* <div className="app-layout__content"> */}
            {children}
          {/* </div> */}
        </main>
        <footer className="app-layout__footer">
          {/* footer */}
        </footer>
      </div>
    </>
  );
};

export default AppLayout;
