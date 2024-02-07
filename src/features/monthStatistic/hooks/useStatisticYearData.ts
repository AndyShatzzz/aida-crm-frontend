export const useStatisticYearData = (
  nameMonth: string[],
  date: string[],
  monthSum: number[],
  monthSumCash: number[],
  monthSumCard: number[]
) => {
  const data = {
    labels: nameMonth,
    datasets: [
      {
        fill: true,
        label: 'Сумма',
        data: date.map((pr: string, index: number) => monthSum[index]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        fill: true,
        label: 'Наличные',
        data: date.map((pr: string, index: number) => monthSumCash[index]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      },
      {
        fill: true,
        label: 'Безналичные',
        data: date.map((pr: string, index: number) => monthSumCard[index]),
        borderColor: 'rgb(139,0,255)',
        backgroundColor: 'rgba(139,0,255, 0.5)',
        yAxisID: 'y'
      }
    ]
  };
  return data;
};
