import { Box, Tab } from '@mui/material';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { MonthStatistic } from '../../../features/monthStatistic/ui/monthStatistic';
import { DayStatistic } from '../../../features/dayStatistic/ui/dayStatistic';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const StatisticsList = () => {
  return (
    <Box
      sx={{
        mt: 12,
        maxWidth: '1280px',
        height: '500px',
        ml: 'auto',
        mr: 'auto'
      }}
    >
      <DayStatistic />
      <MonthStatistic />
    </Box>
  );
};
