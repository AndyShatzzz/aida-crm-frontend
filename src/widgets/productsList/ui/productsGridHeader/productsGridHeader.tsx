import { Grid, Typography } from '@mui/material';

export const ProductsGridHeader = () => {
  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        xs={1}
      >
        <Typography>Изображение</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ textAlign: 'center' }}
      >
        <Typography>Наименование</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ textAlign: 'center' }}
      >
        <Typography>Остаток</Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ textAlign: 'center' }}
      >
        <Typography>Цена</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ textAlign: 'center' }}
      >
        <Typography>Действия</Typography>
      </Grid>
    </Grid>
  );
};
