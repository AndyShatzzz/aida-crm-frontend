import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import css from './tableList.module.scss';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
interface ITableListProps {
  setIsTableOpen: (params: boolean) => void;
  setTableNumber: (params: number) => void;
}

export const TableList: FC<ITableListProps> = ({ setIsTableOpen, setTableNumber }) => {
  const handleClick = (tableNumber: number) => {
    setIsTableOpen(true);
    setTableNumber(tableNumber);
  };

  const { data: cheques } = productsRequest.useGetChequesQuery();
  const [tableQuantity, setTableQuantity] = useState<any>([]);

  const [openCheques, setOpenCheques] = useState<null | any>([]);

  const findOpenCheques = () => {
    if (cheques) {
      const openCheques = cheques.filter((item: any) => {
        if (item.status === true) {
          return item;
        }
      });
      setOpenCheques(openCheques);
    }
  };

  useEffect(() => {
    findOpenCheques();
  }, [cheques]);

  useEffect(() => {
    setTableQuantity(JSON.parse(localStorage.getItem('TableQuantity') || '[]'));

    if (tableQuantity.length !== 0) {
      const a = tableQuantity.map((item: any) => {
        item.open = false;
        if (openCheques.length !== 0) {
          openCheques.find((cheque: any) => {
            if (cheque.tableNumber === item.counter) {
              return (item.open = true);
            } else {
              return (item.open = false);
            }
          });
        }
        return item;
      });
      setTableQuantity(a);
      localStorage.setItem('TableQuantity', JSON.stringify(a));
    }
  }, [cheques, openCheques]);

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
      <Grid
        container
        rowGap={6}
        columnGap={6}
        // rowSpacing={6}
        columns={5}
      >
        {tableQuantity &&
          tableQuantity.map((item: any) => (
            <Grid
              key={Math.random()}
              item
              xs={1}
              className={item.open ? css.myTableOpen : css.myTableClose}
              sx={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleClick(item.counter)}
            >
              <Typography>Стол №{item.counter}</Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
