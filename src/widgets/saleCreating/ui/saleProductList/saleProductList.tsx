import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';
import { Product } from '../../types/saleCreatingType';

interface ISaleProductListProps {
  products: Product[];
  handleDeleteProduct: (params: Product) => void;
}

export const SaleProductList: FC<ISaleProductListProps> = ({ products, handleDeleteProduct }) => {
  return (
    <Grid
      container
      sx={{
        maxHeight: '67vh',
        overflow: 'auto',
        mt: 2
      }}
    >
      {products &&
        products.map((item: Product) => (
          <Grid
            container
            key={item.productId}
            sx={{ width: '100%', height: '40px' }}
          >
            <Grid
              item
              xs={4}
              md={4}
              sx={{ height: '40px' }}
            >
              {item.name}
            </Grid>
            <Grid
              item
              xs={3}
              md={3}
              sx={{ height: '40px', textAlign: 'center' }}
            >
              {item.counter}
            </Grid>

            <Grid
              item
              xs={3}
              md={3}
              sx={{ height: '40px', textAlign: 'center' }}
            >
              {item.cost}
            </Grid>
            <Grid
              item
              xs={2}
              md={2}
              sx={{ height: '40px', textAlign: 'center' }}
            >
              <IconButton
                sx={{
                  width: '18px',
                  height: '18px',
                  mt: 'auto',
                  mb: 'auto',
                  ml: 1,
                  mr: 2
                }}
                onClick={() => handleDeleteProduct(item)}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};
