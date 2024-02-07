import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import css from './tableList.module.scss';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { ITableListProps } from '../types/ITableListProps';
import { ITableQuantity } from '../../../shared/types/ITableQuantity';
import { useFindOpenCheques } from '../../../shared/hooks/useFindOpenCheques';
import { useSetTableQuantity } from '../hooks/useSetTableQuantity';

export const TableList: FC<ITableListProps> = ({ setIsTableOpen, setTableNumber }) => {
  const { data: cheques } = productsRequest.useGetChequesQuery();

  const [tableQuantity, handleSetTableQuantity] = useSetTableQuantity();
  const [openCheques, findOpenCheques] = useFindOpenCheques();

  const handleClick = (tableNumber: number) => {
    setIsTableOpen(true);
    setTableNumber(tableNumber);
  };

  useEffect(() => {
    findOpenCheques(cheques || []);
  }, [cheques]);

  useEffect(() => {
    handleSetTableQuantity(openCheques);
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
        columns={5}
      >
        {tableQuantity &&
          tableQuantity.map((item: ITableQuantity) => (
            <Grid
              key={item.counter}
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
