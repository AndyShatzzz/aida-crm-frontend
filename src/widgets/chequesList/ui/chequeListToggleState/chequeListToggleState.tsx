import { Grid, Typography } from '@mui/material';
import { ICheque } from '../../../../shared/types/ICheque';
import { FC } from 'react';

interface IChequeListToggleStateProps {
  filteredCheques: ICheque[];
}

export const ChequeListToggleState: FC<IChequeListToggleStateProps> = ({ filteredCheques }) => {
  return (
    <>
      {filteredCheques.length === 0 ? (
        <Typography variant="h6">На данный момент ни один чек не пробит. Пожалуйста, выберите другую дату.</Typography>
      ) : (
        <Grid
          container
          sx={{ width: '100%', mb: 2 }}
        >
          <Grid
            item
            sx={{ width: '33%' }}
          >
            Номер стола
          </Grid>
          <Grid
            item
            sx={{ width: '33%' }}
          >
            Сумма
          </Grid>
          <Grid
            item
            sx={{ width: '33%' }}
          >
            Дата
          </Grid>
        </Grid>
      )}
    </>
  );
};
