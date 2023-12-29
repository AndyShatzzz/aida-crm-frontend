import { Box, Divider, Grid, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import TapasIcon from '@mui/icons-material/Tapas';
import React, { useState } from 'react';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { Products } from '../../../entities/products/ui/products';
import { FormModal } from '../../../shared/formModal/ui/formModal';

export const ProductsList = () => {
  const [open, setOpen] = useState(false);

  const { data } = productsRequest.useGetProductsQuery();
  // // eslint-disable-next-line no-console
  // console.log(data);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      marginTop="84px"
      marginLeft="50px"
    >
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
      <Divider sx={{ marginBottom: '20px' }} />
      {data &&
        data.map(item => (
          <Products
            key={item._id}
            image={item.image}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            _id={item._id}
          />
        ))}
      <SpeedDial
        ariaLabel="add-product"
        sx={{ position: 'absolute', bottom: '30px', right: '30px' }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<TapasIcon onClick={() => setOpen(true)} />}
          tooltipTitle="Добавить продукт"
        />
      </SpeedDial>
      <FormModal
        open={open}
        setOpen={setOpen}
        popup={'addProduct'}
        title={'Добавление продукта'}
        buttonText={'Добавить'}
        _id={''}
        image={''}
        name={''}
        quantity={0}
        price={0}
      />
    </Box>
  );
};
