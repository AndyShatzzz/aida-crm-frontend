import { useState } from 'react';
import { ICheque } from '../../../shared/types/ICheque';

export const useFilterDateCheques = (cheques: ICheque[]) => {
  const [daySum, setDaySum] = useState<number[]>([]);
  const sumOfFilteredCheques = (month: string, initValue: number, finalValue: number) => {
    const filterCheques = cheques?.filter((item: ICheque) => {
      if (item?.createdAt?.substring(initValue, finalValue) === month && item.status === 'closed') {
        return item;
      }
    });

    const sumOfFilteredCheques = filterCheques.reduce((prVal: number, item: ICheque) => {
      return prVal + (item.productsList.totalCost || 0);
    }, 0);

    return sumOfFilteredCheques;
  };

  const distructSumToDays = (date: string[]) => {
    const sum = date.map((item: string) => {
      const initValue = 0;
      const finalValue = 10;
      return sumOfFilteredCheques(item, initValue, finalValue);
    });

    setDaySum(sum);
  };

  return [daySum, distructSumToDays] as const;
};
