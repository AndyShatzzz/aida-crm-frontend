import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { Cheque } from '../../../entities/cheque/ui/cheque';
import { FilterDatePicker } from '../../../features/filterDatePicker/ui/filterDatePicker';
import { useEffect, useState } from 'react';

export const ChequesList = () => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [filteredCheques, setFilteredCheques] = useState<any>([]);

  const [dailyCost, setDailyCost] = useState<null | number>(null);

  const sum = () => {
    if (filteredCheques.length !== 0) {
      const sumOfCheques = filteredCheques.reduce((prVal: number, item: any) => prVal + item.productsList.totalCost, 0);
      setDailyCost(sumOfCheques);
    } else {
      setDailyCost(null);
    }
  };

  useEffect(() => {
    sum();
  }, [filteredCheques]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <FilterDatePicker
        cheques={cheques}
        setFilteredCheques={setFilteredCheques}
      />
      <Divider variant="fullWidth" />
      {filteredCheques.length === 0 ? (
        <Typography variant="h6">На данный момент ни один чек не пробит. Пожалуйста, выберите другую дату.</Typography>
      ) : (
        <Grid
          container
          sx={{ width: '100%', mb: 2 }}
        >
          <Grid
            item
            sx={{ width: '30%' }}
          >
            Номер стола
          </Grid>
          <Grid
            item
            sx={{ width: '30%' }}
          >
            Сумма
          </Grid>
          <Grid
            item
            sx={{ width: '30%' }}
          >
            Дата
          </Grid>
        </Grid>
      )}
      <Cheque filteredCheques={filteredCheques} />

      {dailyCost && (
        <Box sx={{ ml: '70%', mt: 4, width: '250px' }}>
          <Paper elevation={10}>
            <Typography
              textAlign="center"
              variant="body1"
              sx={{ mt: 1 }}
            >
              Итого оборот:
            </Typography>
            <Typography
              textAlign="center"
              variant="body1"
              sx={{ mt: 1 }}
            >
              {dailyCost} Рублей
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};
