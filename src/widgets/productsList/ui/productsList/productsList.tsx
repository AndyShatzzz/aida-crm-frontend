import { Box, Divider, SpeedDial, SpeedDialAction } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import TapasIcon from '@mui/icons-material/Tapas';
import { useState } from 'react';
import { Products } from '../../../../entities/products/ui/products';
import { FormModal } from '../../../../shared/formModal';
import { ProductsGridHeader } from '../productsGridHeader/productsGridHeader';

export const ProductsList = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      marginTop="84px"
      marginLeft="50px"
    >
      <ProductsGridHeader />
      <Divider sx={{ marginBottom: '20px' }} />
      <Products />
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
