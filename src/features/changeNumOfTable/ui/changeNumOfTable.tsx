import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SnackbarAlert } from '../../../shared/snackbarAlert/snackbarAlert';

interface IInitialState {
  tableQuantity: number;
}

export const ChangeNumOfTable = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [array, setArray] = useState<any>();
  const table: any = [];
  const form = useForm<IInitialState>({
    defaultValues: {
      tableQuantity: JSON.parse(localStorage.getItem('TableQuantity') || '[]').length || 1
    },
    mode: 'onChange'
  });
  const { register, handleSubmit, formState } = form;
  const { isSubmitting, isDirty, isSubmitSuccessful } = formState;

  const onSubmit = (data: IInitialState) => {
    for (let i = 1; i <= data.tableQuantity; i++) {
      table.push({
        open: false,
        counter: i
      });
    }

    setArray(table);
    setIsSnackbarOpen(false);
    setTimeout(() => {
      setIsSnackbarOpen(true);
    }, 3000);
  };

  useEffect(() => {
    if (array) {
      localStorage.setItem('TableQuantity', JSON.stringify(array));
    }
  }, [array]);

  // eslint-disable-next-line no-console
  console.log(isSubmitSuccessful);

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: 200, height: 100, mb: 10, mt: 12 }}
      >
        <Typography variant="body1">Изменение количества столов</Typography>
        <TextField
          type="number"
          fullWidth
          sx={{ mt: 2 }}
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
      {isSubmitSuccessful && (
        <Snackbar
          // autoHideDuration={4000}
          open={!isSnackbarOpen}
          onClose={() => setIsSnackbarOpen(state => !state)}
        >
          <SnackbarAlert
            severity="success"
            onClose={() => setIsSnackbarOpen(state => !state)}
          >
            Количество столов успешно изменено
          </SnackbarAlert>
        </Snackbar>
      )}
    </Box>
  );
};
