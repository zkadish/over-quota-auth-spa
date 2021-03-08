import { useState } from 'react';
import { IconButton, makeStyles, Menu, MenuItem  } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { signOut } from '../../../services/authn';
import routes from '../../../constants/routes';
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

const AppLayout = props => {
  const { children, history } = props;

  const iconButtonClasses = iconButtonStyles();

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };

  const onProfile = () => {
    setAnchorMenu(null);
    history.push(routes.USER_PROFILE);
  }

  const onSignOut = () => {
    setAnchorMenu(null);
    signOut().then(res => {
      const { data } = res;

      history.push(routes[data.redirect]);
    });
  }

  return (
    <div className="app-layout">
      <header className="AppLayout__header">
        <IconButton className={iconButtonClasses.root}>
          <ChatIcon />
        </IconButton>
        <IconButton className={iconButtonClasses.root} onClick={handleClick}>
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorMenu}
          keepMounted
          open={Boolean(anchorMenu)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Sign In</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <MenuItem onClick={onProfile}>Profile</MenuItem>
          <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
        </Menu>
      </header>
      <main className="AppLayout__main">
        <div className="AppLayout__content">
          {children}
        </div>
      </main>
      <footer className="AppLayout__footer">
        {/* footer */}
      </footer>
    </div>
  );
};

export default AppLayout;
