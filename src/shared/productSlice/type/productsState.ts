import { ProductData } from './productData';

export interface ProductsState {
  [productId: string]: ProductData;
}
