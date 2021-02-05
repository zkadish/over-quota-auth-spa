import { useState, useRef } from 'react';
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
  Popper,
  Fade,
  Typography,
  Paper,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Bullet from '@material-ui/icons/Lens';
import routes from '../../constants/routes';
import { login } from '../../services/authn';

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

const Login = props => {
  const { history } = props;

  const formControlClasses = formControlStyles();
  const btnClasses = btnStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: '',
    showPassword: false,
  });
  // const [requirePassword, setRequirePassword] = useState({
  //   eightChars: false,
  //   upLetter: false,
  //   lowLetter: false,
  //   number: false,
  //   special: false,
  // });
  // const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [password, setPassword] = useState('');
  // const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({
    confirm: false
  });

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;

  const onEmailChange = e => {
    setEmail(e.target.value);
    setIsValid(emailRegex.test(e.target.value));
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setHasValue(!!e.target.value);
  };

  // const handleChange = (prop) => (event) => {
  //   const { target: { value } } = event;
  //   setValues({ ...values, [prop]: value });
    
  //   if (prop === 'password') {
  //     // const validObj = validatePassword(value);
  //     // setRequirePassword(validObj);
  //     // const isPasswordValid = Object.values(validObj).every(bool => bool);
  //     // setValidated(isPasswordValid);
  //   }

  //   if (prop === 'confirm') {
  //     const error = value !== values.password;
  //     setErrors({
  //       ...errors,
  //       confirm: error,
  //     });
  //     setConfirmed(!error);
  //   }
  // };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClickHandler = () => {
    login({
      email,
      password,
    }).then(res => {
      const { data, status } = res;
      if (res.error) throw res;
      if (status === 200) {
        // setUserData(data.user);
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
          <div>Login to your Account...</div>
          {/* <div>Please create a strong password.</div> */}
        </div>
        <FormControl className={clsx(formControlClasses.root)} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type="text"
            value={email}
            onChange={onEmailChange}
            labelWidth={43}
            fullWidth
          />
        </FormControl>
        <FormControl className={clsx(formControlClasses.confirm, { [formControlClasses.error]: errors.confirm })} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChange}
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
            labelWidth={73}
            error={errors.confirm}
            aria-describedby="helper-text"
            fullWidth
          />
          <FormHelperText className={formControlClasses.helperText} id="helper-text">
            {errors.confirm && 'Email and password don\'t match our records.'}
          </FormHelperText>
        </FormControl>
        <Button
          color="primary"
          className={btnClasses.root}
          fullWidth
          variant="contained"
          onClick={onClickHandler}
          disabled={!isValid || !hasValue}
        >
          Login
        </Button>
        <Link to={routes.FORGOT_PASSWORD}>Forgot password?</Link>
        {/* <div className="policy-message">
          By clicking register, you're agreeing to our Terms of Service, Privacy Policy and Cookie Policy.
        </div> */}
      </div>
    </div>
  );
};

export default Login;
