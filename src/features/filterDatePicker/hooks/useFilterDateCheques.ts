import { ICheque } from '../../../shared/types/ICheque';

export const useFilterDateCheques = () => {
  const filterDateCheques = (
    data: ICheque[] | undefined,
    setFilteredCheques: (params: ICheque[]) => void,
    valueDate: string
  ) => {
    if (data) {
      const filterCheques = data.filter((item: ICheque) => {
        if (item.createdAt) {
          if (item.createdAt.substring(0, 10) === valueDate) {
            return item;
          }
        }
      });
      setFilteredCheques(filterCheques);
    }
  };
  return filterDateCheques;
};
