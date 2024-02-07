import { ICheque } from '../../../shared/types/ICheque';
import { IProductsListsCheque } from '../../../shared/types/IProductsListsCheque';
import { IUsePatchCheque } from '../types/IUsePatchCheque';

export const usePatchChequeStatus = () => {
  async function handlePatchChequeStatus(
    PatchChequeStatus: (params: IUsePatchCheque) => void,
    tableNumberCheques: ICheque,
    products: IProductsListsCheque[],
    totalCost: number | null,
    cash: number,
    card: number
  ) {
    await PatchChequeStatus({
      _id: tableNumberCheques._id ?? '',
      status: 'closed',
      productsList: {
        cheque: products,
        totalCost: totalCost,
        cash: cash,
        card: card
      }
    });
  }
  return handlePatchChequeStatus;
};
