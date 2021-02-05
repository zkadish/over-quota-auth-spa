import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '../Switch';
import routes from '../../constants/routes';
import { registerUser } from '../../services/authn';

import './ForgotPassword.scss'

const textFieldStyles = makeStyles(() => ({
  root: {
    margin: '0 0 24px',
    backgroundColor: 'rgba(255, 255, 255, .3)'
  }
}));

const loginBtnStyles = makeStyles(() => ({
  root: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400'
  }
}));

const ForgotPassword = props => {
  const { history } = props;

  const textFieldClasses = textFieldStyles();
  const loginBtnClasses = loginBtnStyles();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;

  const emailOnChange = e => {
    setEmail(e.target.value);
    setIsValid(emailRegex.test(e.target.value));
  };

  const onResetPassword = () => {
    // registerUser({ email, emailLists }).then(res => {
    //   const { data, status } = res;
    //   if (res.error) throw res;
    //   if (status === 200) {
    //     setUserData(data.user);
    //     history.push(routes[data.redirect]);
    //   }
    // }).catch(error => {
    //   console.log(error)
    // });
  };

  const onBackBtn = () => {
    history.push(routes.LOGIN);
  };

  return (
    <div className="container">
      <div className="container__login">
        <div className="container__logo">SkillUp</div>
        <div className="container__message">
          <div>Enter your email...</div>
          <div>We'll send you a password reset link to your email.</div>
        </div>
        <TextField
          className={textFieldClasses.root}
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={emailOnChange}
        />
        <Button
          color="primary"
          className={loginBtnClasses.root}
          fullWidth
          variant="contained"
          onClick={onResetPassword}
          disabled={!isValid}
        >
          Reset Password
        </Button>
        <div className="create-account">
          <Link to={routes.REGISTER_USER}>Create Account?</Link>
        </div>
        <Button variant="outlined" onClick={onBackBtn}>
          &nbsp;&nbsp;Back&nbsp;&nbsp;
        </Button>
      </div>
    </div>
  )
};

export default ForgotPassword;
