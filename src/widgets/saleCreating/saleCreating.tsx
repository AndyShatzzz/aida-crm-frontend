import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { productsRequest } from '../../shared/api/productsRequest/productsRequest';
import { useForm, useFieldArray } from 'react-hook-form';

interface ISaleCreatingProps {
  isTableOpen: boolean;
  setIsTableOpen: (params: boolean) => void;
}

type TSetProducts = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  owner: string;
};

export const SaleCreating: FC<ISaleCreatingProps> = ({ isTableOpen, setIsTableOpen }) => {
  const { data: resProduct } = productsRequest.useGetProductsQuery();
  const [productData, setProductData] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [productId, setProductId] = useState<any>('');
  // eslint-disable-next-line no-console
  console.log(product);

  const handleCounter = () => {
    // const result: any = {};
    // product.forEach(function (a: any) {
    //   if (result[a._id] != undefined) ++result[a._id];
    //   else result[a._id] = 1;
    // });
    // // eslint-disable-next-line no-console
    // console.log(result);

    if (product.length > 0) {
      // eslint-disable-next-line no-console
      console.log(product[product.length - 1]);
      setProductData(product);

      let a = product.map((item: any) => {
        if (item._id == product[product.length - 1]._id) {
          // eslint-disable-next-line no-console
          setProduct([
            ...product,
            {
              ...item,
              number: item.number + 1
            }
          ]);
        }
      });
      // eslint-disable-next-line no-console
      console.log(a);
      // eslint-disable-next-line no-console
      console.log(product);
    }
  };

  return (
    <>
      {isTableOpen && (
        <Box
          sx={{ flexGrow: 1, mt: 10 }}
          display="flex"
          flexDirection="row"
        >
          <Box
            sx={{ width: '40%', height: '88vh', overflow: 'auto' }}
            position="relative"
          >
            <TableContainer sx={{ height: '70vh', overflow: 'auto' }}>
              <TableHead sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TableRow sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Количество</TableCell>
                  <TableCell>Цена</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column'
                }}
              >
                {product &&
                  product.map((item: { name: string; quantity: number; price: number; _id: string }, i: number) => (
                    <TableRow
                      key={Math.random()}
                      sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>

                      <TableCell>{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </TableContainer>
            <Box
              position="absolute"
              bottom="10px"
              width="100%"
            >
              <Typography>Итого</Typography>
              <Typography>Итого</Typography>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={handleCounter}
              >
                Зарегистрировать чек
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1 }}
              >
                Оплатить
              </Button>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ flexGrow: 0.1 }}
            variant="middle"
            color="secondary"
          />
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
                      setProduct([
                        ...product,
                        {
                          ...item,
                          number: 1
                        }
                      ])
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
          <IconButton
            sx={{ width: '40px', height: '40px' }}
            onClick={() => setIsTableOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};
