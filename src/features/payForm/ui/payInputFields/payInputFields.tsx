import { TextField } from '@mui/material';
import { FC } from 'react';
import { IPayInputFieldsProps } from '../../types/IPayInputFieldsProps';

export const PayInputFields: FC<IPayInputFieldsProps> = ({ totalCost, register, errors }) => {
  return (
    <>
      {totalCost !== null && (
        <TextField
          label="Наличные"
          sx={{ mt: 2 }}
          type="number"
          {...register('cash', {
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Сумма оплаты не может быть отрицательной.'
            },
            max: {
              value: totalCost,
              message: 'Сумма оплаты не может превышать сумму чека.'
            }
          })}
          helperText={errors.cash?.message}
        />
      )}
      {totalCost !== null && (
        <TextField
          label="Безналичные"
          sx={{ mt: 2 }}
          type="number"
          {...register('card', {
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Сумма оплаты не может быть отрицательной.'
            },
            max: {
              value: totalCost,
              message: 'Сумма оплаты не может превышать сумму чека.'
            }
          })}
          helperText={errors.card?.message}
        />
      )}
    </>
  );
};
