import { Box, Grid, Typography, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import css from './tableList.module.scss';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { ITableListProps } from '../types/ITableListProps';
import { ITableQuantity } from '../../../shared/types/ITableQuantity';
import { useFindOpenCheques } from '../../../shared/hooks/useFindOpenCheques';
import { useSetTableQuantity } from '../hooks/useSetTableQuantity';
import { SaleEditMode } from '../../saleEditMode/saleEditMode';

export const TableList: FC<ITableListProps> = ({ setIsTableOpen, setTableNumber }) => {
  const { data: cheques } = productsRequest.useGetChequesQuery();

  const [tableQuantity, handleSetTableQuantity] = useSetTableQuantity();
  const [openCheques, findOpenCheques] = useFindOpenCheques();

  const [editMode, setEditMode] = useState(false);

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

  return editMode ? (
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
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        fullWidth
        onClick={() => setEditMode(state => !state)}
      >
        Редактировать столы
      </Button>
      <SaleEditMode />
    </Box>
  ) : (
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
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        fullWidth
        onClick={() => setEditMode(state => !state)}
      >
        Редактировать столы
      </Button>
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
