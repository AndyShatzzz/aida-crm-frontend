import { useState } from 'react';
import { ICheque } from '../../../shared/types/ICheque';

export const useFilterDateChequesCard = (cheques: ICheque[]) => {
  const [monthSumCard, setMonthSumCard] = useState<number[]>([]);
  const filterDateChequesCard = (month: string, initValue: number, finalValue: number) => {
    const filterCheques = cheques.filter((item: ICheque) => {
      if (item.createdAt?.substring(initValue, finalValue) === month && item.status === 'closed') {
        return item;
      }
    });
    const sumOfFilteredCheques = filterCheques.reduce((prVal: number, item: ICheque) => {
      return prVal + (item.productsList.card || 0);
    }, 0);
    return sumOfFilteredCheques;
  };
  const distructSumToDaysCard = (date: string[]) => {
    const sumCard = date.map((item: string) => {
      const initValue = 0;
      const finalValue = 7;
      return filterDateChequesCard(item, initValue, finalValue);
    });
    setMonthSumCard(sumCard);
  };
  return [monthSumCard, distructSumToDaysCard] as const;
};
