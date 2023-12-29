import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IInitialState {
  tableQuantity: number;
}

interface ITableListProps {
  setIsTableOpen: (paeams: boolean) => void;
}

export const TableList: FC<ITableListProps> = ({ setIsTableOpen }) => {
  const [array, setArray] = useState<number[]>();
  const table: number[] = [1];
  const form = useForm<IInitialState>({
    defaultValues: {
      tableQuantity: JSON.parse(localStorage.getItem('TableQuantity') || '[]').length || 1
    },
    mode: 'onChange'
  });
  const { register, handleSubmit, formState } = form;
  const { isSubmitting, isDirty } = formState;

  const onSubmit = (data: IInitialState) => {
    for (let i = 2; i <= data.tableQuantity; i++) {
      table.push(i);
    }

    setArray(table);
  };

  useEffect(() => {
    if (array) {
      localStorage.setItem('TableQuantity', JSON.stringify(array));
    }
  });

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
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: 200, height: 100, mb: 10 }}
      >
        <TextField
          type="number"
          fullWidth
          label="Фича добавления столов"
          {...register('tableQuantity', {
            valueAsNumber: true
          })}
        />
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting || !isDirty}
        >
          Submit
        </Button>
      </Box>
      <Grid
        container
        rowGap={6}
        columnGap={6}
        // rowSpacing={6}
        columns={5}
      >
        {localStorage.getItem('TableQuantity') &&
          JSON.parse(localStorage.getItem('TableQuantity') || '[]').map((item: any) => (
            <Grid
              key={Math.random()}
              item
              xs={1}
              bgcolor="#999DA0"
              sx={{ width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => setIsTableOpen(true)}
            >
              <Typography>Стол №{item}</Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
