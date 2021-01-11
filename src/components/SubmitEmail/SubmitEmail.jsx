import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '../Switch';
import route from '../../constants/routes';
import './SubmitEmail.scss';

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

const Registration = props => {
  const { history } = props;
  const textFieldClasses = textFieldStyles();
  const loginBtnClasses = loginBtnStyles();
  const switchClasses = switchStyles();

  const onClickHandler = () => {
    history.push(route.APP);
  };

  // console.log(styles);

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
        />
        <Button
          color="primary"
          className={loginBtnClasses.root}
          fullWidth
          variant="contained"
          onClick={onClickHandler}
        >
          Next
        </Button>
        <div className="login-options">
          <div className="login-options__remember-me">
            <Switch className={switchClasses.root} />
            <div>&nbsp;&nbsp;Its ok to send me email about SkillUp.</div>
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

export default Registration;
