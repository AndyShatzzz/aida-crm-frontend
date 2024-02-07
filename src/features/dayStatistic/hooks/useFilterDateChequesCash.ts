import { useState } from 'react';
import { ICheque } from '../../../shared/types/ICheque';

export const useFilterDateChequesCash = (cheques: ICheque[]) => {
  const [daySumCash, setDaySumCash] = useState<number[]>([]);
  const sumOfFilteredChequesCash = (month: string, initValue: number, finalValue: number) => {
    const filterCheques = cheques?.filter((item: ICheque) => {
      if (item.createdAt?.substring(initValue, finalValue) === month && item.status === 'closed') {
        return item;
      }
    });
    const sumOfFilteredCheques = filterCheques.reduce((prVal: number, item: ICheque) => {
      return prVal + (item.productsList.cash || 0);
    }, 0);
    return sumOfFilteredCheques;
  };
  const distructSumToDaysCash = (date: string[]) => {
    const sumCash = date.map((item: string) => {
      const initValue = 0;
      const finalValue = 10;
      return sumOfFilteredChequesCash(item, initValue, finalValue);
    });
    setDaySumCash(sumCash);
  };
  return [daySumCash, distructSumToDaysCash] as const;
};
