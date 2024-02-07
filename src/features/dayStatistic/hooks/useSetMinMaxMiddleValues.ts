import { useEffect, useState } from 'react';

export const useSetMinMaxMiddleValues = (daySum: number[]) => {
  const [max, setMax] = useState<number | null>(null);
  const [min, setMin] = useState<number | null>(null);
  const [middle, setMiddle] = useState<number | null>(null);

  useEffect(() => {
    const a = daySum.map(Number);
    if (a.length !== 0) {
      const max = a.reduce((a: number, b: number) => {
        if (a > b) {
          return a;
        } else {
          return b;
        }
      }, -Infinity);
      setMax(max);

      const min = a.reduce((a: number, b: number) => {
        if (a > b) {
          return b;
        } else {
          return a;
        }
      }, +Infinity);
      setMin(min);

      const middle = a.reduce((a: number, b: number) => {
        return a + b;
      }, 0);
      setMiddle(Math.floor(middle / a.length));
    }
  }, [daySum]);
  return [max, min, middle] as const;
};
