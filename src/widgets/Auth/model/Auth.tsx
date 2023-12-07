export {};
import React, { FC } from 'react';
import { Avatar, Box, Button, Container, TextField, Typography, Link, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { iAuthProps } from '../type/iAuthProps';

const Auth: FC<iAuthProps> = ({ titleText, buttonText, infoText, authLink }) => {
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
        <Box
          component="form"
          width="100%"
          sx={{ mt: 4 }}
        >
          <TextField
            label="Email"
            id="Email"
            fullWidth
          />
          <TextField
            sx={{ mt: 4 }}
            label="Пароль"
            id="Email"
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            fullWidth
          >
            {buttonText}
          </Button>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography>
              {infoText}
              <Link
                sx={{ ml: 0.5 }}
                href="#"
              >
                {authLink}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
