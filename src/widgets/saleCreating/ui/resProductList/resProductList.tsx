import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { productsRequest } from '../../../../shared/api/productsRequest/productsRequest';

interface IHandleCounter {
  productId: string;
  name: string;
  cost: number;
  price: number;
  counter: number;
}

interface IResProductListProps {
  handleCounter: (params: IHandleCounter) => void;
}

export const ResProductList: FC<IResProductListProps> = ({ handleCounter }) => {
  const { data: resProduct } = productsRequest.useGetProductsQuery();
  return (
    <Box
      sx={{ width: '55%', height: '88vh', overflow: 'auto' }}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      bgcolor="#f8f8f8"
    >
      {resProduct &&
        resProduct.map(item => (
          <Box key={item._id}>
            <Box
              sx={{ width: '170px', height: '170px', mb: 2, ml: 2 }}
              onClick={() =>
                handleCounter({
                  productId: item._id,
                  name: item.name,
                  cost: item.price,
                  price: item.price,
                  counter: 1
                })
              }
            >
              <Avatar
                variant="square"
                src={item.image}
                sx={{ width: '170px', height: '155px' }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2">{item.price}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};
