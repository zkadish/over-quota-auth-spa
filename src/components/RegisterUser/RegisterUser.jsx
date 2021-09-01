import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthLayout from '../../containers/Layout/AuthLayout';
import Switch from '../Switch';
import routes from '../../constants/routes';
import { registerUser } from '../../services/authn';
import { isValidEmail } from '../../constants/validators';

import './RegisterUser.scss';

const constants = {
  title: 'Enter your email...',
  message: `It's best to register with your work email.`,
};

const formControlStyles = makeStyles(() => ({
  root: {
    display: 'block',
    margin: '0 0 9px',
  },
  // confirm: {
  //   display: 'block',
  //   margin: '0 0 5px',
  // },
  helperText: {
    height: '19px',
    color: '#f44336;',
  },
  error: {
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#f44336;',
    }
  },
  passwordIcon: {
    marginRight: '-14px',
    padding: '6px 12px',
    borderRadius: '0 4px 4px 0',
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
// TODO: disable next btn after clicking next,
// TODO: ask user if they are registering for a company
// or if they are an individual
// if an error occurs re-enable when on email change
const RegisterUser = props => {
  const { setUserData, history } = props;

  const formControlClasses = formControlStyles();
  const loginBtnClasses = loginBtnStyles();
  const switchClasses = switchStyles();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [emailLists, setEmailLists] = useState('NEWS_LETTER');

  const onSwitchChange = () => {
    setEmailLists(emailLists ? '' : 'NEWS_LETTER');
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
    setIsValid(isValidEmail(e.target.value));
    setError(false);
  };

  const onNext = () => {
    if (!isValid) {
      setError(true);
      return;
    }

    setDisabled(true);

    registerUser({ email: email, emailLists }).then(res => {
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
    <AuthLayout
      title={constants.title}
      message={constants.message}
      button="Next"
      policy
    >
      <FormControl className={clsx(formControlClasses.root)} error={error} variant="outlined">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          type="text"
          value={email}
          error={error}
          onChange={onEmailChange}
          labelWidth={43}
          fullWidth
        />
        <FormHelperText className={formControlClasses.helperText} error={error} id="helper-text">
          {error && 'Enter a valid email.'}
        </FormHelperText>
      </FormControl>
      <Button
        color="primary"
        className={loginBtnClasses.root}
        fullWidth
        variant="contained"
        onClick={onNext}
        disabled={disabled}
      >
        Next
      </Button>
      <div className="login-options">
        <div className="login-options__remember-me">
          <Switch className={switchClasses.root} onSwitchChange={onSwitchChange} checked={emailLists} />
          <div>&nbsp;&nbsp;Its ok to send me the latest news about SkillUp.</div>
        </div>
        <Link to={routes.LOGIN}>Want to sign in?</Link>
      </div>
    </AuthLayout>
  )
}

export default RegisterUser;
