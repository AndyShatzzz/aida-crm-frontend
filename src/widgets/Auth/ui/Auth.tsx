export {};
import React, { FC, forwardRef } from 'react';
import { Avatar, Box, Container, Typography, Snackbar, AlertProps, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { iAuthProps } from '../type/iAuthProps';
import AuthForm from '../../../features/Authorization/ui/FomAuth';

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return (
    <Alert
      elevation={6}
      ref={ref}
      {...props}
    />
  );
});

const Auth: FC<iAuthProps> = ({ titleText, buttonText, infoText, authLink, authRoute }) => {
  const [authMessage, setAuthMessage] = React.useState<string>('');
  const [isSuccessAuth, setIsSuccessAuth] = React.useState<boolean>(false);
  const [isRejectedAuth, setIsRejectedAuth] = React.useState<boolean>(false);

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h5"
          component="h1"
        >
          {titleText}
        </Typography>
        <AuthForm
          buttonText={buttonText}
          infoText={infoText}
          authLink={authLink}
          authRoute={authRoute}
          setIsSuccessAuth={setIsSuccessAuth}
          setAuthMessage={setAuthMessage}
          setIsRejectedAuth={setIsRejectedAuth}
        />
      </Box>

      <Snackbar
        message={authMessage}
        autoHideDuration={2000}
        open={isSuccessAuth}
        onClose={() => setIsSuccessAuth(state => !state)}
      >
        <SnackbarAlert
          onClose={() => setIsRejectedAuth(state => !state)}
          severity="success"
        >
          {authMessage}
        </SnackbarAlert>
      </Snackbar>
      <Snackbar
        message={authMessage}
        autoHideDuration={4000}
        open={isRejectedAuth}
        onClose={() => setIsRejectedAuth(state => !state)}
      >
        <SnackbarAlert
          onClose={() => setIsRejectedAuth(state => !state)}
          severity="error"
        >
          {authMessage}
        </SnackbarAlert>
      </Snackbar>
    </Container>
  );
};

export default Auth;
