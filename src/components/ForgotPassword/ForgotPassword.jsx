import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthLayout from '../../containers/Layout/AuthLayout';
import routes from '../../constants/routes';
import { forgotPassword } from '../../services/authn';
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
  link: {
    margin: '0 0 24px',
    textAlign: 'center',
  },
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

const dialogStyles = makeStyles(() => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '400px',
    }
  },
  title: {
    '& .MuiTypography-h6': {
      fontSize: '36px',
      fontWeight: 'bold',
    }
  },
  content: {
    fontSize: '20px',
    fontWeight: 'bold',
  }
}));

const constants = {
  title: 'Enter your email...',
  message: `We'll send you a password reset link to your email.`,
};

const ForgotPassword = () => {
  const formControlClasses = formControlStyles();
  const loginBtnClasses = loginBtnStyles();
  const dialogClasses = dialogStyles();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [dialog, setDialog] = useState(false);

  const onEmailChange = e => {
    setEmail(e.target.value);
    setError(false);
  };

  const onResetPassword = () => {
    if (!isValidEmail(email)) {
      setError('Not a valid email address...');
      return;
    }
    setDisabled(true);
    forgotPassword({ email }).then(res => {
      const { status } = res;
      if (res.error) throw res;
      if (status === 200) {
        setDialog(true);
      }
    }).catch(res => {
      // Error: Reset link has expired...
      const { error } = res.error.response.data;
      setError(error);
    });
  };

  const onCloseDialog = () => {
    setDisabled(false);
    setDialog(false);
  }

  return (
    <AuthLayout
      title={constants.title}
      message={constants.message}
    >
      <FormControl className={clsx(formControlClasses.root)} variant="outlined">
        <InputLabel error={!!error} htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          error={!!error}
          labelWidth={43}
          fullWidth
        />
        <FormHelperText
          className={formControlClasses.helperText}
          error={!!error}
        >
          {error}
        </FormHelperText>
      </FormControl>
      <Button
        color="primary"
        className={loginBtnClasses.root}
        fullWidth
        variant="contained"
        onClick={onResetPassword}
        disabled={disabled}
      >
        Reset Password
      </Button>
      <div className={formControlClasses.link}>
        <Link to={routes.REGISTER_USER}>Need to create an account?</Link>
      </div>
      <Dialog
        open={dialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={dialogClasses.root}
      >
        <DialogTitle className={dialogClasses.title} id="alert-dialog-title">
          Email Sent...
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={dialogClasses.content} id="alert-dialog-description">
            You should receive a password reset link in your email. Reset your password right away as the link is time sensitive and will expire shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            Send Another Link
          </Button>
        </DialogActions>
      </Dialog>
    </AuthLayout>
  )
};

export default ForgotPassword;
