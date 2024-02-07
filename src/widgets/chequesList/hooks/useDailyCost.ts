import { useState } from 'react';
import { ICheque } from '../../../shared/types/ICheque';

export const useDailyCost = () => {
  const [dailyCost, setDailyCost] = useState<null | number>(null);
  const [dailyCash, setDailyCash] = useState<null | number>(null);
  const [dailyCard, setDailyCard] = useState<null | number>(null);

  const sumResult = (filteredCheques: ICheque[]) => {
    if (filteredCheques.length !== 0) {
      const sumOfCheques = filteredCheques.reduce(
        (prVal: number, item: ICheque) => prVal + (item.productsList.totalCost || 0),
        0
      );
      setDailyCost(sumOfCheques);
      const sumOfChequesCash = filteredCheques.reduce((prVal: number, item: ICheque) => {
        if (item.status === 'closed') {
          return prVal + (item.productsList.cash || 0);
        } else {
          return prVal;
        }
      }, 0);
      setDailyCash(sumOfChequesCash);
      const sumOfChequesCard = filteredCheques.reduce((prVal: number, item: ICheque) => {
        if (item.status === 'closed') {
          return prVal + (item.productsList.card || 0);
        } else {
          return prVal;
        }
      }, 0);
      setDailyCard(sumOfChequesCard);
    } else {
      setDailyCost(null);
    }
  };
  return [dailyCost, dailyCash, dailyCard, sumResult] as const;
};
