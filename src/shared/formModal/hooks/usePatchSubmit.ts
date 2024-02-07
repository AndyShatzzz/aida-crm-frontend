import { IFromValues } from '../types/IFromValues';

interface IPatchProducts {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export const usePatchSubmit = (
  _id: string,
  prevStateProductsQuantity: any,
  name: string,
  price: number,
  image: string,
  PatchProduct: (params: IPatchProducts) => void
) => {
  async function patchProductsSubmit(data: IFromValues) {
    await PatchProduct({
      _id: _id,
      name: data.productName || name,
      quantity: prevStateProductsQuantity[_id].quantity + data.quantity,
      price: data.price || price,
      image: data.image || image
    });
  }
  return patchProductsSubmit;
};
