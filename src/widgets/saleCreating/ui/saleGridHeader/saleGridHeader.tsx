import { Grid } from '@mui/material';

export const SaleGridHeader = () => {
  return (
    <Grid
      container
      sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}
    >
      <Grid
        item
        xs={4}
        md={4}
      >
        Наименование
      </Grid>
      <Grid
        item
        xs={3}
        md={3}
        sx={{ textAlign: 'center' }}
      >
        Количество
      </Grid>
      <Grid
        item
        xs={3}
        md={3}
        sx={{ textAlign: 'center' }}
      >
        Цена
      </Grid>
      <Grid
        item
        xs={2}
        md={2}
        sx={{ textAlign: 'center' }}
      >
        Действия
      </Grid>
    </Grid>
  );
};
