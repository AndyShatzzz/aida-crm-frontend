import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { IChequeInfoProps } from '../../types/IChequeInfoProps';

export const ChequeInfo: FC<IChequeInfoProps> = ({ prod }) => {
  return (
    <>
      <Grid
        container
        sx={{ width: '100%' }}
      >
        <Grid
          item
          sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
        >
          {prod.name}
        </Grid>
        <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}>{prod.counter}</Typography>
        <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}>{prod.cost}</Typography>
      </Grid>
    </>
  );
};
