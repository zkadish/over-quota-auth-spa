import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GetAppIcon from '@mui/icons-material/GetApp';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from '../../../services/authn';
import routes from '../../../constants/routes';
import { setUser } from '../../../features/authnSlice';
import Helmet from 'react-helmet';

import classes from './AppLayout.styles';

const drawerWidth = 240;
const openedMixin = (theme) => {
  return ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})};

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  // the following code breaks the drawer by preventing it
  // from expanding when the browser is greater then 600px
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppLayout = props => {
  const { children, pageTitle } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authn.user);

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
      // TODO: update user and clear access token
      // const { data } = res;
      dispatch(setUser(null));
    });
  }

  const onSideNavClick = (e, text) => {
    if (text === 'Video') {
      navigate(routes.VIDEO);
    }
  }

  return (
    <>
    <Helmet>
      <title>{pageTitle}</title>
      </Helmet>
      <Box sx={{ ...classes.appLayout }}>
        <CssBaseline />
        <MuiAppBar position="fixed" open={open} sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Skill Up
            </Typography>
          </Toolbar>
          <Toolbar>
            <IconButton
              className="profile-icon-button"
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </MuiAppBar>
        <MuiDrawer variant="permanent" open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
              ...openedMixin(theme),
              '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
              ...closedMixin(theme),
              '& .MuiDrawer-paper': closedMixin(theme),
            }),
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}
              sx={{
                height: '44px',
                width: '44px',
                margin: '10px',
              }}
            >
              <ChevronLeftIcon
                sx={{ alignItems: 'flex-end' }}
              />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Welcome', 'Purchase', 'Downloads', 'App Settings'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && <GetAppIcon />}
                    {index === 1 && <ShoppingCartIcon />}
                    {index === 2 && <GetAppIcon />}
                    {index === 3 && <SettingsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Video', 'Support', 'Contact Us'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={(e) => onSideNavClick(e, text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && <VideoLibraryIcon />}
                    {index === 1 && <HelpOutlineIcon />}
                    {index === 2 && <MailOutlineIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </MuiDrawer>
        <main className="app-content">
          {children}
        </main>
        <footer className="app-footer">
          {/* footer */}
        </footer>
      </Box>
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
    </>
  );
};

export default AppLayout;
