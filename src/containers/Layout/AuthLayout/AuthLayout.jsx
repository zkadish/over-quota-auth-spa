import { useState, createRef } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import routes from '../../../constants/routes';

import classes from './AuthLayout.styles';

const AuthLayout = props => {
  const { title, message, button, policy, children } = props;
  const navigate = useNavigate();

  const [anchorMenu, setAnchorMenu] = useState(null);

  const accountMenu = createRef();

  const handleClick = () => {
    setAnchorMenu(accountMenu.current);
  };

  const onAccountMenuClose = () => {
    setAnchorMenu(null);
  };
  
  const onSignIn = () => {
    setAnchorMenu(null);
    navigate(routes.LOGIN);
  }

  return (
    <Box sx={{ ...classes.authLayout }}>
      <header className="authLayout-header">
        {/* <IconButton className="icon-button">
          <ChatIcon />
        </IconButton> */}
        <IconButton
          ref={accountMenu}
          className="icon-button"
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorMenu}
          keepMounted
          open={Boolean(anchorMenu)}
          onClose={onAccountMenuClose}
        >
          <MenuItem onClick={onSignIn}>Sign In</MenuItem>
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>
      </header>
      <main className="authLayout-main">
        <Box className="auth-form">
          <Box className="auth-form-logo">OverQuota</Box>
          <Box className="auth-form-message">
            <Box>{title}</Box>
            <Box>{message}</Box>
          </Box>
          {children}
          {policy && (
            <Box className="auth-form-policy">
              By clicking <b>"{button}"</b> you're agreeing to our Terms of Service, Privacy Policy and Cookie Policy.
            </Box>
          )}
        </Box>
      </main>
      <footer className="auth-form-footer">
        Privacy Policy | Security Policy | Copyright &#169; 2021
      </footer>
    </Box>
  );
};

export default AuthLayout;
