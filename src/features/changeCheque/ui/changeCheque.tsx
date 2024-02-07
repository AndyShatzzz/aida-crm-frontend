import { FC, useState } from 'react';
import { Cheque } from '../../../entities/cheque/ui/cheque/cheque';
import { Box, Button, Modal, Typography } from '@mui/material';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { IChangeCheque } from '../types/IChangeCheque';
import { useDeleteCheque } from '../hooks/useDeleteCheque';

export const ChangeCheque: FC<IChangeCheque> = ({ chequeProps, expanded, setExpanded }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [PatchChequeStatus] = productsRequest.usePatchChequeStatusMutation();
  const handleDeleteCheque = useDeleteCheque(PatchChequeStatus, setIsOpenModal);

  return (
    <>
      <Cheque
        chequeProps={chequeProps}
        expanded={expanded}
        setExpanded={setExpanded}
      >
        <>
          {chequeProps.status === 'closed' && (
            <Button
              sx={{ ml: '81%', mb: 1, mt: 1 }}
              onClick={() => setIsOpenModal(true)}
            >
              Удалить
            </Button>
          )}
          <Modal
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              bgcolor="background.paper"
              sx={{ width: '400px' }}
              style={{ position: 'absolute', top: '30%', left: '38%' }}
            >
              <Typography
                sx={{ mt: 2, textAlign: 'center' }}
                variant="body1"
              >
                Вы уверены, что хотите удалить чек?
              </Typography>
              <Typography
                sx={{ mt: 1, textAlign: 'center' }}
                variant="body2"
              >
                Данный чек не будет учитываться в статистике, однако останется в истории.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleDeleteCheque(chequeProps)}
              >
                Да
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => setIsOpenModal(false)}
              >
                Нет
              </Button>
            </Box>
          </Modal>
        </>
      </Cheque>
    </>
  );
};
