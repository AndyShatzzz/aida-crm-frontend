import { Box } from '@mui/material';
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
import { MonthStatistic } from '../../../features/monthStatistic';
import { DayStatistic } from '../../../features/dayStatistic';

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
