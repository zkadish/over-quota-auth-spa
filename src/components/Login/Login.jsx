import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Button,
  IconButton,
} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AuthLayout from '../../containers/Layout/AuthLayout';
import Switch from '../Switch';
import routes from '../../constants/routes';
import { login } from '../../services/authn';
import { isValidEmail } from '../../constants/validators';

const formControlStyles = makeStyles(() => ({
  root: {
    display: 'block',
    margin: '0 0 9px',
  },
  helperText: {
    height: '19px',
  },
  passwordIcon: {
    marginRight: '-14px',
    padding: '6px 12px',
    borderRadius: '0 4px 4px 0',
  },
  adornment: {
    marginLeft: 0,
  },
}));

const btnStyles = makeStyles(() => ({
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

const constants = {
  title: 'Login to your Account...',
  // message: `Please create a strong password.`,
};

const Login = props => {
  const { user, setUserData } = props;

  const formControlClasses = formControlStyles();
  const btnClasses = btnStyles();
  const switchClasses = switchStyles();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailLists, setEmailLists] = useState('');
  const [hasValue, setHasValue] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  useEffect(() => {
    if (user?.email) setEmail(user?.email);
  }, [user]);

  const onSwitchChange = () => {
    setEmailLists(!!emailLists ? '' : 'NEWS_LETTER');
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
    setErrors({
      ...errors,
      email: false,
    });
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setHasValue(!!e.target.value);
    setErrors({
      ...errors,
      password: false,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClickHandler = () => {
    if (!isValidEmail(email)) {
      setErrors({
        ...errors,
        email: true,
      });
      return;
    }

    login({
      email,
      password,
    }).then(res => {
      const { data, status } = res;

      if (res.error) throw res;
      if (status === 200 && data.authenticated) {
        // TODO: after successful login clear cookie so that a new one gets created.
        setUserData(data.user);
        navigate(routes.WELCOME);
      }
    }).catch(error => {
      console.log(error);
      setErrors({
        ...errors,
        password: true,
      });
    });
  };

  return (
    <AuthLayout
      title={constants.title}
      button="Login"
      policy
    >
      <FormControl className={clsx(formControlClasses.root)} variant="outlined">
        <InputLabel error={errors.email} htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          error={errors.email}
          labelWidth={43}
          fullWidth
        />
        <FormHelperText
          className={formControlClasses.helperText}
          error={errors.email}
        >
          {errors.email && 'Enter a valid email.'}
        </FormHelperText>
      </FormControl>
      <FormControl className={clsx(formControlClasses.root)} variant="outlined">
        <InputLabel error={errors.password} htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onPasswordChange}
          endAdornment={
            <InputAdornment className={formControlClasses.adornment} position="end">
              <IconButton
                className={formControlClasses.passwordIcon}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={73}
          error={errors.password}
          aria-describedby="helper-text"
          fullWidth
        />
        <FormHelperText error={errors.password} className={formControlClasses.helperText} id="helper-text">
          {errors.password && 'Email and password don\'t match our records.'}
        </FormHelperText>
      </FormControl>
      <Button
        color="primary"
        className={btnClasses.root}
        fullWidth
        variant="contained"
        onClick={onClickHandler}
        disabled={!hasValue}
      >
        Login
      </Button>
      <div className="login-options">
        <div className="login-options__remember-me">
          <Switch className={switchClasses.root} onSwitchChange={onSwitchChange} checked={emailLists} />
          <div>&nbsp;&nbsp;Its ok to send me the latest news about OverQuota.</div>
        </div>
        <Link to={routes.FORGOT_PASSWORD}>Forgot password?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
