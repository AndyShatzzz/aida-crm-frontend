export const useReturnStatisticsOptionsData = (label: string) => {
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
        text: `Статистика по ${label}`
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
  return options;
};
