import { IFromValues } from '../types/IFromValues';

interface IPostProducts {
  name: string;
  quantity: number;
  price: number;
  image: string;
  owner?: string;
}

export const usePostSubmit = (PostProducts: (params: IPostProducts) => void, userId?: string) => {
  async function PostProductsSubmit(data: IFromValues) {
    await PostProducts({
      name: data.productName,
      quantity: data.quantity,
      price: data.price,
      image: data.image,
      owner: userId
    });
  }
  return PostProductsSubmit;
};
