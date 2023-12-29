import { MenuItem, TextField } from '@mui/material';
import React, { FC } from 'react';

interface IFormFields {
  register: any;
  errors: {
    avatar?: {
      message?: string;
    };
    name?: {
      message?: string;
    };
    role?: {
      message?: string;
    };
  };
  role: string;
}

export const FormFields: FC<IFormFields> = ({ register, errors, role }) => {
  return (
    <>
      <TextField
        sx={{ mt: 2 }}
        label="Аватар"
        id="avatar"
        type="text"
        fullWidth
        {...register('avatar', {
          pattern: {
            value:
              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
            message: 'Данное поле может содержать только ссылку на Ваш аватар'
          }
        })}
        helperText={errors.avatar?.message}
      />
      <TextField
        sx={{ mt: 2 }}
        label="Имя"
        id="name"
        type="text"
        fullWidth
        {...register('name', {
          minLength: {
            value: 2,
            message: 'Данное поле не может содержать меньше двух символов'
          },
          pattern: {
            value: /[a-zA-Zа-яА-ЯЁё -]+$/,
            message: 'Имя может содержать только латиницу, кириллицу, пробел и дефис'
          }
        })}
        helperText={errors.name?.message}
      />
      <TextField
        sx={{ mt: 2 }}
        label="Должность"
        id="role"
        type="text"
        fullWidth
        select
        defaultValue={role}
        {...register('role')}
      >
        <MenuItem value="Управляющий">Управляющий</MenuItem>
        <MenuItem value="Администратор">Администратор</MenuItem>
        <MenuItem value="Официант">Официант</MenuItem>
      </TextField>
    </>
  );
};
