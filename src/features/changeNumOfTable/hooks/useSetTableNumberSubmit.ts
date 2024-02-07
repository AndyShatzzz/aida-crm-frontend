import { useState } from 'react';
import { ITableQuantity } from '../../../shared/types/ITableQuantity';

interface IArray {
  open: boolean;
  counter: number;
}

export const useSetTableNumberSubmit = (setIsSnackbarOpen: (params: boolean) => void) => {
  const [array, setArray] = useState<IArray[] | []>();
  const table: ITableQuantity[] = [];

  const onSubmit = (data: { tableQuantity: number }) => {
    for (let i = 1; i <= data.tableQuantity; i++) {
      table.push({
        open: false,
        counter: i
      });
    }

    setArray(table);
    setIsSnackbarOpen(false);

    setTimeout(() => {
      setIsSnackbarOpen(true);
    }, 3000);
  };

  return [array, onSubmit] as const;
};
