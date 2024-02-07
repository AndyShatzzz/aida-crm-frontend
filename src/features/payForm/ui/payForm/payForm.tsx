import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IPayFormProps } from '../../types/IPayFormProps';
import { PayInputFields } from '../payInputFields/payInputFields';
import { usePayFormState } from '../../hooks/usePayFormState';
import { IFormInitialState } from '../../types/IFormInitialState';

export const PayForm: FC<IPayFormProps> = ({ isPayModalOpen, setIsPayModalOpen, totalCost, handlePayCheque }) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const form = usePayFormState();
  const { register, handleSubmit, formState, watch } = form;
  const { errors, isSubmitting } = formState;

  async function onSubmit(data: IFormInitialState) {
    try {
      await handlePayCheque(data.cash, data.card);
      await setIsPayModalOpen(false);
      form.reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

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
        <PayInputFields
          totalCost={totalCost}
          register={register}
          errors={errors}
        />
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
