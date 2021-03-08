import { useState, createRef, useRef } from 'react';
import { IconButton, makeStyles, Menu, MenuItem  } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import routes from '../../../constants/routes';
import './AuthLayout.scss';

const iconButtonStyles = makeStyles(() => ({
  root: {
    color: '#fff',
    '& .MuiSvgIcon-root': {
      width: '40px',
      height: '40px',
    },
  },
}));

const AuthLayout = props => {
  const { title, message, button, policy, history, children } = props;

  const iconButtonClasses = iconButtonStyles();

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
    history.push(routes.LOGIN);
  }

  return (
    <div className="app-wrapper">
      <header className="app-wrapper__header">
        <IconButton className={iconButtonClasses.root}>
          <ChatIcon />
        </IconButton>
        <IconButton ref={accountMenu} className={iconButtonClasses.root} onClick={handleClick}>
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
      <main className="app-wrapper__main">
        <div className="auth-form">
          <div className="auth-form__logo">SkillUp</div>
          <div className="auth-form__message">
            <div>{title}</div>
            <div>{message}</div>
          </div>
          {children}
          {policy && (
            <div className="auth-form__policy">
              By clicking <b>"{button}"</b> you're agreeing to our Terms of Service, Privacy Policy and Cookie Policy.
            </div>
          )}
        </div>
      </main>
      <footer className="app-wrapper__footer">
        {/* footer */}
      </footer>
    </div>
  );
};

export default AuthLayout;
