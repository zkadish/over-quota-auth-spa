import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Button,
  IconButton,
  Popper,
  Fade,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Bullet from '@mui/icons-material/Lens';
import AuthLayout from '../../containers/Layout/AuthLayout';
import routes from '../../constants/routes';
import { resetPassword, validateReset } from '../../services/authn';
import { validatePassword } from '../../constants/validators';

import classes from './ResetPassword.styles.js';

// TODO: add to a constants file
const requirements = [
  { text: '8 or more characters', id: 'eightChars' },
  { text: 'At least 1 uppercase letter', id: 'upLetter' },
  { text: 'At least 1 lowercase letter', id: 'lowLetter' },
  { text: 'At least 1 number', id: 'number' },
  { text: 'At least 1 special character', id: 'special' },
];

const constants = {
  title: 'Reset your password...',
  message: 'Please create a strong password.',
};

// TODO: offer to create a password witch will be sent to the email they entered
const ResetPassword = props => {
  const { user, setUserData } = props;
  const { token } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    confirm: '',
    showPassword: false,
  });
  const [requirePassword, setRequirePassword] = useState({
    eightChars: false,
    upLetter: false,
    lowLetter: false,
    number: false,
    special: false,
  });
  const [validated, setValidated] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({
    confirm: false
  });
  const [open, setOpen] = useState(false);

  const input = useRef(null);

  useEffect(() => {
    validateReset(token).then(res => {
      const { data, error } = res;
      if (error) throw error;
      console.log(res);
      debugger
      setUserData(data.user);
    }).catch(error => {
      console.log(error);
      debugger
      // TODO: open a message modal
      // Your reset link has expired, request another if you still need to change your password.
    });
  }, []);

  const confirmPassword = (value, field) => {
    const error = value !== values[field];
      setErrors({
        ...errors,
        confirm: error,
      });
      setConfirmed(!error);
  }

  const handleChange = (input) => (event) => {
    const { target: { value } } = event;
    setValues({ ...values, [input]: value });
    
    if (input === 'password') {
      const validObj = validatePassword(value);
      setRequirePassword(validObj);
      const isPasswordValid = Object.values(validObj).every(bool => bool);
      setValidated(isPasswordValid);
      if (values.confirm.length > 0) {
        confirmPassword(value, 'confirm');
      }
    }

    if (input === 'confirm') {
      confirmPassword(value, 'password');
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onPasswordClick = (event) => {
    // debugger
    // setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onPassWordBlur = () => {
    setOpen(false);
  }

  const onResetPassword = () => {
    resetPassword(token, {
      password: values.password,
    }).then(res => {
      const { data, status } = res;
      debugger
      if (res.error) throw res;
      if (status === 200) {
        setUserData(data.user);
        navigate(routes[data.redirect]); // LOGIN
      }
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <AuthLayout
      title={constants.title}
      message={constants.message}
      button="Reset Password"
      policy={!!user}
    >
      {/* TODO: base the message on error response  */}
      {!user && (
        <Box sx={{ ...classes.expiredLink }}>
          <Box className="expired-link-text">
            Your password reset link has expired. If you still need to reset your 
            password go back to the forgot password page and request another one.
          </Box>
          <Link to={routes.FORGOT_PASSWORD}>Forgot password?</Link>
        </Box>
      )}
      {!!user && (
        <>
          <FormControl sx={{ ...classes.formControl }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              ref={input}
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              onClick={onPasswordClick}
              onBlur={onPassWordBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className="password-icon"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
              fullWidth
            />
          </FormControl>
          <FormControl
            sx={{
              ...classes.formControlConfirm,
              ...(errors.confirm && classes.formControlError)
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="confirm"
            >Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm"
              type={values.showPassword ? 'text' : 'password'}
              value={values.confirm}
              onChange={handleChange('confirm')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className="password-icon"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={135}
              error={errors.confirm}
              aria-describedby="helper-text"
              fullWidth
            />
            <FormHelperText className="helper-text" id="helper-text">
              {errors.confirm && 'Passwords must match...'}
            </FormHelperText>
          </FormControl>
          <Button
            color="primary"
            sx={{ ...classes.buttonStyles }}
            fullWidth
            variant="contained"
            onClick={onResetPassword}
            disabled={!validated || !confirmed}
          >
            Reset Password
          </Button>
          <Popper
            sx={{ ...classes.popperStyles }}
            open={open}
            anchorEl={input.current}
            placement="right-start"
            transition
            modifiers={{
              offset: {
                enabled: true,
                offset: '0, 8'
              }
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className="popperStyles-paper" elevation={8}>
                  <Typography>Password Requirements...</Typography>
                  {requirements.map((req) => {
                    return (
                      <Typography key={req.text}>
                        <Bullet
                          sx={{
                            ...classes.bulletStyles,
                            ...(requirePassword[req.id] && classes.bulletValidated),
                            ...(!requirePassword[req.id] && classes.bulletWarn),
                          }}
                        />
                        &nbsp;{req.text}
                      </Typography>
                    )
                  })}
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
