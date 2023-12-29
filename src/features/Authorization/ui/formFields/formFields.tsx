import { TextField } from '@mui/material';
import React, { FC } from 'react';

interface IFormFields {
  register: any;
  errors: {
    name?: {
      message?: string;
    };
    password?: {
      message?: string;
    };
  };
}

export const FormFields: FC<IFormFields> = ({ register, errors }) => {
  return (
    <>
      <TextField
        label="Имя"
        id="name"
        fullWidth
        {...register('name', {
          required: 'Поле Имя является обязательным',
          pattern: {
            value: /[a-zA-Zа-яА-ЯЁё -]+$/,
            message: 'Имя может содержать только латиницу, кириллицу, пробел и дефис'
          }
        })}
        helperText={errors.name?.message}
      />
      <TextField
        sx={{ mt: 4 }}
        label="Пароль"
        id="password"
        type="password"
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
    </>
  );
};
