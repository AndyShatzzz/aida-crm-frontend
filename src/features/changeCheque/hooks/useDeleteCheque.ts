import { ICheque } from '../../../shared/types/ICheque';
import { IProductsList } from '../../../shared/types/IProductsList';

interface IPatchChequeStatus {
  _id: string;
  status: string;
  productsList: IProductsList;
}

export const useDeleteCheque = (
  PatchChequeStatus: (params: IPatchChequeStatus) => void,
  setIsOpenModal: (params: boolean) => void
) => {
  const handleDeleteCheque = async (item: ICheque) => {
    try {
      await PatchChequeStatus({
        _id: item._id || '',
        status: 'deleted',
        productsList: {
          cheque: item.productsList.cheque,
          totalCost: 0,
          cash: 0,
          card: 0
        }
      });
      setIsOpenModal(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return handleDeleteCheque;
};
