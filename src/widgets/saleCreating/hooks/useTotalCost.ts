import { useEffect, useState } from 'react';
import { InitialProducts } from '../types/saleCreatingType';

export const useTotalCost = (products: InitialProducts) => {
  const [totalCost, setTotalCost] = useState<number | null>(null);

  useEffect(() => {
    if (products.length > 0) {
      const sumCost = products.reduce((acc, item) => acc + item.cost, 0);
      setTotalCost(sumCost);
    } else {
      setTotalCost(null);
    }
  }, [products]);

  return totalCost;
};
