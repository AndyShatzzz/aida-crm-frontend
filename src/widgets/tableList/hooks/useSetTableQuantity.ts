import { useState } from 'react';
import { ITableQuantity } from '../../../shared/types/ITableQuantity';
import { ICheque } from '../../../shared/types/ICheque';

export const useSetTableQuantity = () => {
  const [tableQuantity, setTableQuantity] = useState<ITableQuantity[]>([]);

  const handleSetTableQuantity = (openCheques: ICheque[] | null) => {
    setTableQuantity(JSON.parse(localStorage.getItem('TableQuantity') || '[]'));

    if (tableQuantity.length !== 0) {
      const newTableQuantity = tableQuantity.map((item: ITableQuantity) => {
        item.open = false;
        if (openCheques?.length !== 0) {
          openCheques?.find((cheque: ICheque) => {
            if (cheque.tableNumber === item.counter) {
              return (item.open = true);
            } else {
              return (item.open = false);
            }
          });
        }
        return item;
      });
      setTableQuantity(newTableQuantity);
      localStorage.setItem('TableQuantity', JSON.stringify(newTableQuantity));
    }
  };
  return [tableQuantity, handleSetTableQuantity] as const;
};
