import { useState, useRef } from 'react';
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
  Popper,
  Fade,
  Typography,
  Paper,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Bullet from '@material-ui/icons/Lens';
import routes from '../../constants/routes';
import { createPassword } from '../../services/authn';

const formControlStyles = makeStyles(() => ({
  root: {
    display: 'block',
    margin: '0 0 24px',
  },
  confirm: {
    display: 'block',
    margin: '0 0 5px',
  },
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

const btnStyles = makeStyles(() => ({
  root: {
    margin: '0 0 24px',
    height: '56px',
    fontSize: '1.4rem',
    textTransform: 'inherit',
    fontWeight: '400'
  }
}));

const popperStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    width: '400px',
  },
  paper: {
    padding: theme.spacing(2),
  }
}));

const bulletStyles = makeStyles(() => ({
  root: {
    width: '10px',
    height: '10px',
  },
  warn: {
    color: 'orange',
  },
  validated: {
    color: 'green',
  }
}));

const requirements = [
  { text: '8 or more characters', id: 'eightChars' },
  { text: 'At least 1 uppercase letter', id: 'upLetter' },
  { text: 'At least 1 lowercase letter', id: 'lowLetter' },
  { text: 'At least 1 number', id: 'number' },
  { text: 'At least 1 special character', id: 'special' },
];

const validatePassword = password => {
  const result = {
    eightChars: false,
    upLetter: false,
    lowLetter: false,
    number: false,
    special: false,
  };
  if (/.{8,}/.test(password)) result.eightChars = true; // eightChars
  if (/[A-Z]/.test(password)) result.upLetter = true; 
  if (/[a-z]/.test(password)) result.lowLetter = true;
  if (/[0-9]/.test(password)) result.number = true;
  if (/[^A-Za-z0-9]/.test(password)) result.special = true;
  return result;
};

// TODO: offer to create a password witch will be sent to the email they entered
const CreatePassword = props => {
  const { user, setUserData, history } = props;

  const formControlClasses = formControlStyles();
  const btnClasses = btnStyles();
  const popperClasses = popperStyles();
  const bulletClasses = bulletStyles();

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

  const handleChange = (prop) => (event) => {
    const { target: { value } } = event;
    setValues({ ...values, [prop]: value });
    
    if (prop === 'password') {
      const validObj = validatePassword(value);
      setRequirePassword(validObj);
      const isPasswordValid = Object.values(validObj).every(bool => bool);
      setValidated(isPasswordValid);
    }

    if (prop === 'confirm') {
      const error = value !== values.password;
      setErrors({
        ...errors,
        confirm: error,
      });
      setConfirmed(!error);
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

  const onClickHandler = () => {
    createPassword({
      email: user.email,
      password: values.password,
      confirmPassword: values.confirm,
    }).then(res => {
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
          <div>Create a Password...</div>
          <div>Please create a strong password.</div>
        </div>
        <Popper
          className={popperClasses.root}
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
              <Paper className={popperClasses.paper} elevation={8}>
                <Typography>Password Requirements...</Typography>
                {requirements.map((req) => {
                  return (
                    <Typography key={req.text}>
                      <Bullet className={clsx(bulletClasses.root,
                        { [bulletClasses.validated]: requirePassword[req.id] },
                        { [bulletClasses.warn]: !requirePassword[req.id] },
                      )} />
                      &nbsp;{req.text}
                    </Typography>
                  )
                })}
              </Paper>
            </Fade>
          )}
        </Popper>
        <FormControl className={clsx(formControlClasses.root)} variant="outlined">
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
                  className={formControlClasses.passwordIcon}
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
        <FormControl className={clsx(formControlClasses.confirm, { [formControlClasses.error]: errors.confirm })} variant="outlined">
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
                  className={formControlClasses.passwordIcon}
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
          <FormHelperText className={formControlClasses.helperText} id="helper-text">
            {errors.confirm && 'Passwords must match...'}
          </FormHelperText>
        </FormControl>
        <Button
          color="primary"
          className={btnClasses.root}
          fullWidth
          variant="contained"
          onClick={onClickHandler}
          disabled={!validated || !confirmed}
        >
          Create Password
        </Button>
        <div className="policy-message">
          By clicking register, you're agreeing to our Terms of Service, Privacy Policy and Cookie Policy.
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
