import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';

interface IStatisticalGraphProps {
  data: any;
  label: string;
}

export const Statistic: FC<IStatisticalGraphProps> = ({ data, label }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Статистика за день'
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };
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
