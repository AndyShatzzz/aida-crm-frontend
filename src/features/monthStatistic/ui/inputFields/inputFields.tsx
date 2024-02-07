import { MenuItem, TextField } from '@mui/material';
import moment from 'moment';
import { years } from '../../lib/constants/years';
import { FC } from 'react';
import { IInputFields } from '../../types/IInputFields';

export const InputFields: FC<IInputFields> = ({ register }) => {
  return (
    <>
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
