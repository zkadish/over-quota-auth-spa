
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '../Switch';
import routes from '../../constants/routes';
import { registerUser } from '../../services/authn';

import './RegisterUser.scss';

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

const switchStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    top: '2px'
  }
}));

const RegisterUser = props => {
  const { setUserData, history } = props;
  const textFieldClasses = textFieldStyles();
  const loginBtnClasses = loginBtnStyles();
  const switchClasses = switchStyles();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [emailLists, setEmailLists] = useState('NEWS_LETTER');

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;

  const onSwitchChange = () => {
    setEmailLists(emailLists ? '' : 'NEWS_LETTER');
  };

  const emailOnChange = e => {
    setEmail(e.target.value);
    setIsValid(emailRegex.test(e.target.value));
  };

  const onClickHandler = () => {
    registerUser({ email, emailLists }).then(res => {
      const { data, status } = res;
      if (res.error) throw res;
      if (status === 200) {
        setUserData(data.user);
        history.push(routes[data.redirect]);
      }
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <div className="container">
      <div className="container__login">
        <div className="container__logo">SkillUp</div>
        <div className="container__message">
          <div>Enter your email...</div>
          <div>It's best to register with your work email.</div>
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
          onClick={onClickHandler}
          disabled={!isValid}
        >
          Next
        </Button>
        <div className="login-options">
          <div className="login-options__remember-me">
            <Switch className={switchClasses.root} onSwitchChange={onSwitchChange} checked={emailLists} />
            <div>&nbsp;&nbsp;Its ok to send me the latest news about SkillUp.</div>
          </div>
          {/* <Link to={route.PASSWORD_RESET}>Forgot password?</Link> */}
        </div>
        <div className="policy-message">
          By clicking next, you're agreeing to our Terms of Service, Privacy Policy and Cookie Policy.
        </div>
      </div>
    </div>
  )
}

export default RegisterUser;
