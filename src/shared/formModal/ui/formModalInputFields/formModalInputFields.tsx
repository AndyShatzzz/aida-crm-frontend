import { InputAdornment, TextField } from '@mui/material';
import { FC } from 'react';
import { IFormModalInputFieldsProps } from '../../types/IFormModalInputFieldsProps';

export const FormModalInputFields: FC<IFormModalInputFieldsProps> = ({ register, errors }) => {
  return (
    <>
      <TextField
        type="text"
        fullWidth
        sx={{ mt: 2 }}
        label="Изображение"
        {...register('image', {
          pattern: {
            value:
              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
            message: 'Данное поле может содержать только ссылку на продукт'
          }
        })}
        helperText={errors.image?.message}
      />
      <TextField
        type="text"
        fullWidth
        sx={{ mt: 2 }}
        label="Наименование"
        {...register('productName', {
          pattern: {
            value: /[a-zA-Zа-яА-ЯЁё -]+$/,
            message: 'Наименование продукта может содержать только латиницу, кириллицу, пробел и дефис'
          },
          minLength: {
            value: 3,
            message: 'Наименование продукта не может содержать меньше трех символов'
          }
        })}
        helperText={errors.productName?.message}
      />
      <TextField
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        label="Цена"
        InputProps={{
          endAdornment: <InputAdornment position="end">Р</InputAdornment>
        }}
        {...register('price', {
          required: {
            value: true,
            message: 'Данное поле обязательно для заполнения'
          },
          min: {
            value: 1,
            message: 'Цена продукта должно быть больше 0'
          },
          valueAsNumber: true
        })}
        helperText={errors.price?.message}
      />
      <TextField
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        label="Количество"
        InputProps={{
          endAdornment: <InputAdornment position="end">шт</InputAdornment>
        }}
        {...register('quantity', {
          required: {
            value: true,
            message: 'Данное поле обязательно для заполнения'
          },
          min: {
            value: 1,
            message: 'Количество продукта должно быть больше 0'
          },
          valueAsNumber: true
        })}
        helperText={errors.quantity?.message}
      />
    </>
  );
};
