import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { IMinMaxMiddleStatisticProps } from '../../types/IMinMaxMiddleStatisticProps';

export const MinMaxMiddleStatistic: FC<IMinMaxMiddleStatisticProps> = ({ min, max, middle }) => {
  return (
    <Grid container>
      <Grid
        item
        sx={{ width: '200px', height: '50px', bgcolor: '#E5E4E2', borderRadius: '10%', textAlign: 'center', mr: 2 }}
      >
        <Typography variant="body2">Максимальная выручка</Typography>
        {max && <Typography>{max}</Typography>}
      </Grid>
      <Grid
        item
        sx={{ width: '200px', height: '50px', bgcolor: '#E5E4E2', borderRadius: '10%', textAlign: 'center', mr: 2 }}
      >
        <Typography variant="body2">Минимальная выручка</Typography>
        {min && <Typography>{min}</Typography>}
      </Grid>
      <Grid
        item
        sx={{ width: '200px', height: '50px', bgcolor: '#E5E4E2', borderRadius: '10%', textAlign: 'center' }}
      >
        <Typography variant="body2">Средняя выручка</Typography>
        {middle && <Typography>{middle}</Typography>}
      </Grid>
    </Grid>
  );
};
