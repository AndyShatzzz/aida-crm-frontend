import { ICheque } from '../../../shared/types/ICheque';
import { IProductsListsCheque } from '../../../shared/types/IProductsListsCheque';
import { IUsers } from '../../../shared/types/IUsers';
import { IUsePatchCheque } from '../types/IUsePatchCheque';

export const usePatchCheque = () => {
  async function handlePatchCheque(
    PatchCheque: (params: IUsePatchCheque) => void,
    tableNumberCheques: ICheque,
    products: IProductsListsCheque[],
    totalCost: number | null,
    user: IUsers | undefined
  ) {
    PatchCheque({
      _id: tableNumberCheques._id ?? '',
      productsList: {
        cheque: products,
        totalCost: totalCost
      },
      prevState: [
        {
          cheque: products,
          totalCost: totalCost,
          prevOwner: user?._id ?? ''
        }
      ]
    });
  }
  return handlePatchCheque;
};
