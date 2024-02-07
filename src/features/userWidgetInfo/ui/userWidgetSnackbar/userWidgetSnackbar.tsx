import { Snackbar } from '@mui/material';
import { SnackbarAlert } from '../../../../shared/snackbarAlert/snackbarAlert';
import { FC } from 'react';
import { IUserWidgetSnackbarProps } from '../../types/IUserWidgetSnackbarProps';

export const UserWidgetSnackbar: FC<IUserWidgetSnackbarProps> = ({ isSnackbarOpen, setIsSnackbarOpen }) => {
  return (
    <Snackbar
      autoHideDuration={4000}
      open={!isSnackbarOpen}
      onClose={() => setIsSnackbarOpen(false)}
    >
      <SnackbarAlert
        severity="error"
        onClose={() => setIsSnackbarOpen(false)}
      >
        Произошла ошибка, пожалуйста обновите страницу
      </SnackbarAlert>
    </Snackbar>
  );
};
