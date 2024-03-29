import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormHelperText,
  Button,
  TextField,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import AuthLayout from '../../containers/Layout/AuthLayout';
import Switch from '../Switch';
import routes from '../../constants/routes';
import { registerUser } from '../../services/authn';
import { isValidEmail } from '../../constants/validators';
import { setUser } from '../../features/authnSlice';

import classes from './RegisterUser.styles';

const constants = {
  title: 'Enter your email...',
  message: `It's best to register with your work email.`,
};

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        dispatch(setUser(data.user));
        navigate(routes[data.redirect]);
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
      <FormControl sx={{ ...classes.formControl }} error={error}>
        <TextField
          id="email"
          type="text"
          value={email}
          error={error}
          onChange={onEmailChange}
          label="Email"
          labelWidth={43}
          variant="outlined"
          fullWidth
        />
        <FormHelperText className="helper-text" error={error} id="helper-text">
          {error && 'Enter a valid email.'}
        </FormHelperText>
      </FormControl>
      <Button
        color="primary"
        sx={{ ...classes.loginButton }}
        fullWidth
        variant="contained"
        onClick={onNext}
        disabled={disabled}
      >
        Next
      </Button>
      <Box sx={{ ...classes.loginOptions }}>
        <Box className="remember-me">
          <Switch onSwitchChange={onSwitchChange} checked={emailLists} />
          <Box>&nbsp;&nbsp;Its ok to send me the latest news about OverQuota.</Box>
        </Box>
        <Link to={routes.LOGIN}>Want to sign in?</Link>
      </Box>
    </AuthLayout>
  )
}

export default RegisterUser;
