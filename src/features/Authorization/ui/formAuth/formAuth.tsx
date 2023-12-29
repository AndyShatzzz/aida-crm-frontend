export {};
import { Box, Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { iFormAuthProps } from '../../type/iFormAuthProps';
import { iFormValues } from '../../type/iFormValues';
import { useSignin } from '../../hooks/useSignin';
import { useSignup } from '../../hooks/useSignup';
import { FormFields } from '../formFields/formFields';
import { AuthLink } from '../authLink/authLink';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { setTrue } from '../../../checkToken/ux/initLoggedInSlice';

export const FormAuth: FC<iFormAuthProps> = ({
  buttonText,
  infoText,
  authLink,
  authRoute,
  setIsSuccessAuth,
  setAuthMessage,
  setIsRejectedAuth
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<iFormValues>({
    defaultValues: {
      name: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const signin = useSignin(setIsSuccessAuth, setAuthMessage, setIsRejectedAuth, setIsSuccess);
  const signup = useSignup(setIsSuccessAuth, setAuthMessage, setIsRejectedAuth, setIsSuccessRegister);

  async function onSubmit(data: iFormValues) {
    if (location.pathname === '/signup') {
      await signup(data.name, data.password);
    }
    if (location.pathname === '/signin') {
      await signin(data.name, data.password);
    }
  }
  useEffect(() => {
    if (isSuccessRegister) {
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    }
    if (isSuccess) {
      dispatch(setTrue());
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  });

  return (
    <Box
      component="form"
      width="100%"
      sx={{ mt: 4 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormFields
        register={register}
        errors={errors}
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
      <AuthLink
        infoText={infoText}
        authLink={authLink}
        authRoute={authRoute}
      />
    </Box>
  );
};
