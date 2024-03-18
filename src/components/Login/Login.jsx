import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthLayout from '../../containers/Layout/AuthLayout';
import Switch from '../Switch';
import routes from '../../constants/routes';
import { login } from '../../services/authn';
import { isValidEmail } from '../../constants/validators';
import { setUser } from '../../features/authnSlice';

import classes from './Login.styles';

const constants = {
  title: 'Login to your Account...',
  // message: `Please create a strong password.`,
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authn.user);
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
        dispatch(setUser(data.user));
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
      <FormControl sx={{ ...classes.formControl }}>
        <TextField
          id="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          error={errors.email}
          label="Email"
          labelWidth={43}
          variant="outlined"
          fullWidth
        />
        <FormHelperText
          className="helper-text"
          error={errors.email}
        >
          {errors.email && 'Enter a valid email.'}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ ...classes.formControl }}>
        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onPasswordChange}
          endAdornment={
            <InputAdornment className="adornment" position="end">
              <IconButton
                className="password-icon"
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
          label="Password"
          error={errors.password}
          variant="outlined"
          aria-describedby="helper-text"
          fullWidth
        />
        <FormHelperText error={errors.password} className="helper-text" id="helper-text">
          {errors.password && 'Email and password don\'t match our records.'}
        </FormHelperText>
      </FormControl>
      <Button
        color="primary"
        sx={{ ...classes.buttonStyles }}
        fullWidth
        variant="contained"
        onClick={onClickHandler}
        disabled={!hasValue}
      >
        Login
      </Button>
      <Box sx={{ ...classes.loginOptions }}>
        <Box className="remember-me">
          <Switch onSwitchChange={onSwitchChange} checked={emailLists} />
          <Box>&nbsp;&nbsp;Its ok to send me the latest news about OverQuota.</Box>
        </Box>
        <Link to={routes.FORGOT_PASSWORD}>Forgot password?</Link>
        <Box className="link">
          <Link to={routes.REGISTER_USER}>Need to create an account?</Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
