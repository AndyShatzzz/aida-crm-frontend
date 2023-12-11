export {};
import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signup } from '../Api/ApiRegister';
import { signIn } from '../Api/ApiLogin';
import { iFormAuthProps } from '../type/iFormAuthProps';
import { iFormValues } from '../type/iFormValues';

const FomAuth: FC<iFormAuthProps> = ({
  buttonText,
  infoText,
  authLink,
  authRoute,
  setIsSuccessAuth,
  setAuthMessage,
  setIsRejectedAuth
}) => {
  const location = useLocation();

  const form = useForm<iFormValues>({
    defaultValues: {
      name: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;

  async function onSubmit(data: iFormValues) {
    // eslint-disable-next-line no-console
    console.log(data);
    if (location.pathname === '/signup') {
      try {
        const res = await signup(data.name, data.password);
        if (res.status === 'error') {
          throw new Error(res.message);
        } else {
          setIsSuccessAuth(true);
          setAuthMessage('Вы успешно зарегистрировались, пожалуйста, подождите идет авторизация');
        }
      } catch (error) {
        setIsRejectedAuth(true);
        setAuthMessage('Ошибка регистрации, попробуйте изменить имя или пароль и попробуйте снова');
      }
    }
    if (location.pathname === '/signin') {
      try {
        const res = await signIn(data.name, data.password);
        if (res.status === 'error') {
          throw new Error(res.message);
        } else {
          setIsSuccessAuth(true);
          setAuthMessage('Вы успешно авторизировались, пожалуйста, подождите.');
        }
      } catch (error) {
        setIsRejectedAuth(true);
        setAuthMessage('Ошибка авторизации, некорректно введено имя или пароль.');
      }
    }
  }

  return (
    <Box
      component="form"
      width="100%"
      sx={{ mt: 4 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        label="Имя"
        id="name"
        fullWidth
        {...register('name', {
          required: 'Поле Имя является обязательным',
          pattern: {
            value: /[a-zA-Zа-яА-ЯЁё -]+$/,
            message: 'Имя может содержать только латиницу, кирилицу, пробел и дефис'
          }
        })}
        helperText={errors.name?.message}
      />
      <TextField
        sx={{ mt: 4 }}
        label="Пароль"
        id="password"
        fullWidth
        {...register('password', {
          required: 'Поле Пароль является обязательным',
          minLength: {
            value: 8,
            message: 'Пароль должен содержать минимум 8 символов'
          },
          maxLength: {
            value: 30,
            message: 'Пароль должен содержать максимум 30 символов'
          }
        })}
        helperText={errors.password?.message}
      />
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        fullWidth
        type="submit"
        disabled={!isDirty || isSubmitting}
      >
        {buttonText}
      </Button>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Typography>
          {infoText}
          <Link to={authRoute}>
            <MuiLink
              sx={{ ml: 0.5 }}
              href="#"
            >
              {authLink}
            </MuiLink>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default FomAuth;
