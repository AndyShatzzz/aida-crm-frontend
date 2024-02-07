import { Box, Button, Modal, Typography } from '@mui/material';
import { FC } from 'react';
import { IConfirmationModal } from '../types/IConfirmationModal';

export const ConfirmationModal: FC<IConfirmationModal> = ({ open, setOpen, setIsConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        bgcolor="background.paper"
        sx={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        style={{ position: 'absolute', top: '30%', left: '38%' }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', mb: '20px', mt: '20px' }}
        >
          Вы уверены?
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mb: '20px' }}
          onClick={() => setIsConfirm(true)}
        >
          Да
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mb: '20px' }}
          onClick={() => setOpen(false)}
        >
          Нет
        </Button>
      </Box>
    </Modal>
  );
};
