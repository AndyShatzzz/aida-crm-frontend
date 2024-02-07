import { Box, Paper, Typography } from '@mui/material';
import { FC } from 'react';

interface IDailyCostProps {
  dailyCost: number | null;
  dailyCash: number | null;
  dailyCard: number | null;
}

export const DailyCost: FC<IDailyCostProps> = ({ dailyCost, dailyCash, dailyCard }) => {
  return (
    <Box sx={{ ml: '70%', mt: 4, width: '250px' }}>
      <Paper elevation={10}>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ mt: 1 }}
        >
          Итого оборот:
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ mt: 1 }}
        >
          {dailyCost} Рублей
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ mt: 1 }}
        >
          Наличные:
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ mt: 1 }}
        >
          {dailyCash && dailyCash > 0 && dailyCash} Рублей
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ mt: 1 }}
        >
          Безналичные:
        </Typography>
        <Typography
          textAlign="center"
          variant="body1"
          sx={{ mt: 1 }}
        >
          {dailyCard && dailyCard > 0 ? dailyCard : 0} Рублей
        </Typography>
      </Paper>
    </Box>
  );
};
