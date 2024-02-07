import { Avatar, Grid } from '@mui/material';
import { DeleteProduct } from '../../../features/deleteProduct';
import { ChangeProductInfo } from '../../../features/changeProductInfo/ui/changeProductInfo';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';

export const Products = () => {
  const { data: productsData } = productsRequest.useGetProductsQuery();
  return (
    <>
      {productsData &&
        productsData.map(prod => (
          <Grid
            key={prod._id}
            container
            spacing={1}
          >
            <Grid
              item
              xs={1}
            >
              <Avatar
                sx={{ width: '40px', height: '40px' }}
                src={prod.image}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ textAlign: 'center' }}
            >
              {prod.name}
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ textAlign: 'center' }}
            >
              {prod.quantity}, шт
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ textAlign: 'center' }}
            >
              {prod.price}р
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ChangeProductInfo
                _id={prod._id}
                image={prod.image}
                name={prod.name}
                quantity={prod.quantity}
                price={prod.price}
              />
              <DeleteProduct _id={prod._id} />
            </Grid>
          </Grid>
        ))}
    </>
  );
};
