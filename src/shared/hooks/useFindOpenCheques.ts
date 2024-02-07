import { useState } from 'react';
import { ICheque } from '../types/ICheque';

export const useFindOpenCheques = () => {
  const [openCheques, setOpenCheques] = useState<null | ICheque[]>([]);
  const findOpenCheques = (cheques: ICheque[]) => {
    if (cheques) {
      const openCheques = cheques.filter((item: ICheque) => {
        if (item.status === 'opened') {
          return item;
        }
      });
      setOpenCheques(openCheques);
    }
  };
  return [openCheques, findOpenCheques] as const;
};
