export const useStatisticData = (date: string[], daySum: number[], daySumCash: number[], daySumCard: number[]) => {
  const data = {
    labels: date,
    datasets: [
      {
        fill: true,
        label: 'Сумма',
        data: date.map((pr: string, index: number) => daySum[index]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        fill: true,
        label: 'Наличные',
        data: date.map((pr: string, index: number) => daySumCash[index]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      },
      {
        fill: true,
        label: 'Безналичные',
        data: date.map((pr: string, index: number) => daySumCard[index]),
        borderColor: 'rgb(139,0,255)',
        backgroundColor: 'rgba(139,0,255, 0.5)',
        yAxisID: 'y'
      }
    ]
  };
  return data;
};
