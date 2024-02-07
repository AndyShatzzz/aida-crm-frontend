import { ICheque } from '../../../shared/types/ICheque';
import { IProductsListsCheque } from '../../../shared/types/IProductsListsCheque';
import { IUsers } from '../../../shared/types/IUsers';

export const usePostCheque = () => {
  async function handlePostCheque(
    PostCheque: (params: ICheque) => void,
    tableNumber: number,
    products: IProductsListsCheque[],
    totalCost: number | null,
    user: IUsers | undefined
  ) {
    await PostCheque({
      tableNumber: tableNumber,
      status: 'opened',
      productsList: {
        cheque: products,
        totalCost: totalCost
      },
      owner: user?._id ?? '',
      prevState: [
        {
          cheque: products,
          totalCost: totalCost,
          prevOwner: user?._id ?? ''
        }
      ]
    });
  }
  return handlePostCheque;
};
