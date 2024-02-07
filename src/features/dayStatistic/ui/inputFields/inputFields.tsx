import { MenuItem, TextField } from '@mui/material';
import moment from 'moment';
import { nameMonth } from '../../lib/constants/nameMonth';
import { years } from '../../lib/constants/years';
import { FC } from 'react';
import { IInputFieldsProps } from '../../types/IInputFieldsProps';
import { INameMonth } from '../../types/INameMonth';

export const InputFields: FC<IInputFieldsProps> = ({ register }) => {
  return (
    <>
      <TextField
        sx={{ mt: 2 }}
        label="Месяц"
        id="month"
        type="text"
        defaultValue={`${moment(Date.now()).format('MM')}`}
        select
        {...register('month')}
      >
        {nameMonth.map((item: INameMonth, index: number) => (
          <MenuItem
            value={nameMonth.length !== 0 ? item.value : ''}
            key={index}
          >
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ mt: 2 }}
        label="Год"
        id="year"
        type="text"
        defaultValue={`${moment(Date.now()).format('YYYY')}`}
        select
        {...register('year')}
      >
        {years.map((item: string, index: number) => (
          <MenuItem
            value={years.length !== 0 ? item : ''}
            key={index}
          >
            {item}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
