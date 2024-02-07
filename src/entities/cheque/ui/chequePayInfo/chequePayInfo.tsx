import { Typography } from '@mui/material';
import { FC } from 'react';
import { IChequePayInfoProps } from '../../types/IChequePayInfoProps';

export const ChequePayInfo: FC<IChequePayInfoProps> = ({ chequeProps, userName }) => {
  return (
    <>
      <Typography sx={{ ml: '80%', mb: 1, mt: 1 }}>Официант: {userName}</Typography>
      <Typography sx={{ ml: '80%', mb: 0.5, mt: 1 }}>Итого: {chequeProps.productsList.totalCost} рублей</Typography>
      {chequeProps.status === 'closed' && (
        <>
          <Typography
            variant="body2"
            sx={{ ml: '81%', mb: 0.5, mt: 0.5 }}
          >
            Наличные: {chequeProps.productsList.cash} рублей
          </Typography>
          <Typography
            variant="body2"
            sx={{ ml: '81%', mb: 0.5, mt: 0.5 }}
          >
            Безналичные: {chequeProps.productsList.card} рублей
          </Typography>
        </>
      )}
    </>
  );
};
