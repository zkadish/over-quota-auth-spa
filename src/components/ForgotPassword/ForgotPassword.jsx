import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
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
} from '@mui/material';
import AuthLayout from '../../containers/Layout/AuthLayout';
import routes from '../../constants/routes';
import { forgotPassword } from '../../services/authn';
import { isValidEmail } from '../../constants/validators';

import classes from './ForgotPassword.styles';

const constants = {
  title: 'Enter your email...',
  message: `We'll send you a password reset link to your email.`,
};

const ForgotPassword = () => {
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
      <FormControl sx={{ ...classes.formControl }} variant="outlined">
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
          className="helper-text"
          error={!!error}
        >
          {error}
        </FormHelperText>
      </FormControl>
      <Button
        color="primary"
        sx={{ ...classes.loginButton}}
        fullWidth
        variant="contained"
        onClick={onResetPassword}
        disabled={disabled}
      >
        Reset Password
      </Button>
      <Box sx={{ ...classes.formControlLink }}>
        <Link to={routes.REGISTER_USER}>Need to create an account?</Link>
      </Box>
      <Dialog
        open={dialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog"
      >
        <DialogTitle className="dialog-title" id="alert-dialog-title">
          An Email has been sent to: {email}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog-content" id="alert-dialog-description">
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
