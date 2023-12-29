import { Avatar, Grid } from '@mui/material';
import React, { FC } from 'react';
import { DeleteProduct } from '../../../features/deleteProduct/ui/deleteProduct';
import { ChangeProductInfo } from '../../../features/changeProductInfo/ui/changeProductInfo';

interface IProductsProps {
  image: string;
  name: string;
  quantity: number;
  price: number;
  _id: string;
}

export const Products: FC<IProductsProps> = ({ image, name, quantity, _id, price }) => {
  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        xs={1}
      >
        <Avatar
          sx={{ width: '40px', height: '40px' }}
          src={image}
        />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ textAlign: 'center' }}
      >
        {name}
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ textAlign: 'center' }}
      >
        {quantity}, шт
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ textAlign: 'center' }}
      >
        {price}р
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ChangeProductInfo
          _id={_id}
          image={image}
          name={name}
          quantity={quantity}
          price={price}
        />
        <DeleteProduct _id={_id} />
      </Grid>
    </Grid>
  );
};
