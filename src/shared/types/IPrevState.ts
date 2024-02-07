import { IProductsListsCheque } from './IProductsListsCheque';

export interface IPrevState {
  cheque: IProductsListsCheque[];
  prevOwner: string;
  totalCost: number | null;
  _id?: string;
}
