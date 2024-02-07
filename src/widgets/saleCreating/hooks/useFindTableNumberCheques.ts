import { ICheque } from '../../../shared/types/ICheque';
import { ITableQuantity } from '../../../shared/types/ITableQuantity';

export const useFindTableNumberCheques = (
  tableNumber: number | null,
  tableQuantity: ITableQuantity[],
  setTableNumberCheques: (params: ICheque | null) => void
) => {
  const findTableNumberCheques = (openCheques: ICheque[]) => {
    if (tableNumber) {
      const tableNumberCheques = openCheques?.find((item: ICheque) => item.tableNumber === tableNumber);
      openCheques?.find((item: ICheque) => {
        tableQuantity?.find((table: ITableQuantity) => {
          if (table.counter === item.tableNumber) {
            table.open = true;
          }
        });
      });
      setTableNumberCheques(tableNumberCheques || null);
      localStorage.setItem('TableQuantity', JSON.stringify(tableQuantity));
    }
  };
  return findTableNumberCheques;
};
