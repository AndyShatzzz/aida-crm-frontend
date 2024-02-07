import { Box } from '@mui/material';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { IStatisticalGraphProps } from '../types/IStatisticalGraphProps';
import { useReturnStatisticsOptionsData } from '../hooks/useReturnStatisticsOptionsData';

export const Statistic: FC<IStatisticalGraphProps> = ({ data, label }) => {
  const options = useReturnStatisticsOptionsData(label);

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
      <Line
        options={options}
        data={data}
      />
    </Box>
  );
};
