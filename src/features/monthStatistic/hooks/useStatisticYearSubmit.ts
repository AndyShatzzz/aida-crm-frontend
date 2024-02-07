import { useState } from 'react';
import { IFormYearStatistic } from '../types/IFormYearStatistic';

export const useStatisticYearSubmit = () => {
  const [date, setDate] = useState<string[]>([]);
  const onSubmit = (data: IFormYearStatistic) => {
    const dateArray: string[] = [];
    for (let i = 1; i <= 12; i++) {
      dateArray.push(i < 10 ? `${data.year}-0${i}` : `${data.year}-${i}`);
    }
    setDate(dateArray);
  };
  return [date, onSubmit] as const;
};
