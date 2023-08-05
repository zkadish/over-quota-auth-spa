import { useState, useRef } from 'react';
import {
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
import { createPassword } from '../../services/authn';
import { validatePassword } from '../../constants/validators';

import classes from './CreatePassword.styles.js';

const requirements = [
  { text: '8 or more characters', id: 'eightChars' },
  { text: 'At least 1 uppercase letter', id: 'upLetter' },
  { text: 'At least 1 lowercase letter', id: 'lowLetter' },
  { text: 'At least 1 number', id: 'number' },
  { text: 'At least 1 special character', id: 'special' },
];

const constants = {
  title: 'Create a Password...',
  message: `Please create a strong password.`,
};

// TODO: offer to create a password witch will be sent to the email they entered
const CreatePassword = props => {
  const { user } = props;

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
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({
    confirm: false
  });
  const [open, setOpen] = useState(false);

  const input = useRef(null);

  const confirmPassword = (value, field) => {
    // debugger
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
      // TODO: validate on create
      const validObj = validatePassword(value);
      setRequirePassword(validObj);
      const isPasswordValid = Object.values(validObj).every(bool => bool);
      setValidated(isPasswordValid);
      if (values.confirm.length > 0) {
        confirmPassword(value, 'confirm');
      }
    }

    if (input === 'confirm') {
      // TODO: validate on create
      confirmPassword(value, 'password');
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onPasswordClick = () => (event) => {
    // setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onPassWordBlur = () => {
    setOpen(false);
  }

  const onCreatePassword = () => {

    setDisabled(true);

    createPassword({
      email: user.email,
      password: values.password,
      confirmPassword: values.confirm,
    }).then(res => {
      const { data, status } = res;
      if (res.error) throw res;
      if (status === 200) {
        // setUserData(data.user);
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
      button="Create Password"
      policy
    >
      <FormControl sx={{ ...classes.formControl }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          ref={input}
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          onClick={onPasswordClick()}
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
          ...(errors.confirm && classes.formControlError),
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
        onClick={onCreatePassword}
        disabled={!validated || !confirmed || disabled}
      >
        Create Password
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
            <Paper className="popper-paper" elevation={8}>
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
    </AuthLayout>
  );
};

export default CreatePassword;
