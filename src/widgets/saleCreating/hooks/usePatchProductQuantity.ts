import { ProductsState } from '../../../shared/productSlice/type/productsState';
import { IProductsListsCheque } from '../../../shared/types/IProductsListsCheque';

interface IPatchProductQuantity {
  _id: string;
  quantity: number;
}

export const usePatchProductQuantity = () => {
  async function handlePatchProductQuantity(
    products: IProductsListsCheque[],
    PatchProductQuantity: (params: IPatchProductQuantity) => void,
    prevStateProductsQuantity: ProductsState
  ) {
    products.forEach((item: IProductsListsCheque) => {
      PatchProductQuantity({
        _id: item.productId,
        quantity: prevStateProductsQuantity[item.productId].quantity - item.counter
      });
    });
  }
  return handlePatchProductQuantity;
};
