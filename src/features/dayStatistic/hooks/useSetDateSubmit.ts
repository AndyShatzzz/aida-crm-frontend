import { useState } from 'react';

interface IDataSubmit {
  month: string;
  year: string;
}

export const useSetDateSubmit = () => {
  const [date, setDate] = useState<string[]>([]);

  const onSubmit = (data: IDataSubmit) => {
    const dateArray: string[] = [];
    for (let i = 1; i <= 31; i++) {
      dateArray.push(i < 10 ? `${data.year}-${data.month}-0${i}` : `${data.year}-${data.month}-${i}`);
    }
    setDate(dateArray);
  };
  return [date, onSubmit] as const;
};
