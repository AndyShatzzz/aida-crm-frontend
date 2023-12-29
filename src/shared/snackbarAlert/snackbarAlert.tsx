import { Alert, AlertProps } from '@mui/material';
import { forwardRef } from 'react';

export const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return (
    <Alert
      elevation={6}
      ref={ref}
      {...props}
    />
  );
});
