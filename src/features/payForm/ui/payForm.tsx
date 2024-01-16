import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IPayFormProps } from '../type/IPayFormProps';
import { IFormInitialState } from '../type/IFormInitialState';

export const PayForm: FC<IPayFormProps> = ({ isPayModalOpen, setIsPayModalOpen, totalCost, handlePayCheque }) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const form = useForm<IFormInitialState>({
    defaultValues: {
      cash: 0,
      card: 0
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = (data: any) => {
    handlePayCheque(data.cash, data.card);
    setIsPayModalOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (totalCost) {
      if (watch('cash') + watch('card') == totalCost && !errors.card?.message && !errors.cash?.message) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    }
  }, [watch('cash'), watch('card')]);

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isPayModalOpen}
      onClose={() => setIsPayModalOpen(false)}
    >
      <Box
        component="form"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: 'center' }}
        >
          Форма оплаты
        </Typography>
        {totalCost !== null && (
          <TextField
            label="Наличные"
            sx={{ mt: 2 }}
            type="number"
            // value={watch('card') && totalCost - (watch('card') || 0)}
            {...register('cash', {
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Сумма оплаты не может быть отрицательной.'
              },
              max: {
                value: totalCost,
                message: 'Сумма оплаты не может превышать сумму чека.'
              }
            })}
            helperText={errors.cash?.message}
          />
        )}
        {totalCost !== null && (
          <TextField
            label="Безналичные"
            sx={{ mt: 2 }}
            type="number"
            // value={watch('cash') && totalCost - (watch('cash') || 0)}
            {...register('card', {
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Сумма оплаты не может быть отрицательной.'
              },
              max: {
                value: totalCost,
                message: 'Сумма оплаты не может превышать сумму чека.'
              }
            })}
            helperText={errors.card?.message}
          />
        )}
        {totalCost && (
          <>
            {disabledButton && (
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body1">Остаток</Typography>
                {!isNaN(watch('card')) && (
                  <Typography variant="body1">
                    {totalCost - ((watch('card') || 0) + (watch('cash') || 0))} Рублей
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body1">Итого к оплате</Typography>
          <Typography variant="body1">{totalCost} Рублей</Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!isSubmitting && disabledButton}
        >
          Оплатить
        </Button>
      </Box>
    </Modal>
  );
};
