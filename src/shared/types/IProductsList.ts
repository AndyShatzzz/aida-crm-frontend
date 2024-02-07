import { IProductsListsCheque } from './IProductsListsCheque';

export interface IProductsList {
  card?: number;
  cash?: number;
  totalCost: number | null;
  cheque: IProductsListsCheque[];
}
