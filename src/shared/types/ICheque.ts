import { IPrevState } from './IPrevState';
import { IProductsList } from './IProductsList';

export interface ICheque {
  createdAt?: string;
  owner: string;
  _id?: string;
  prevState: IPrevState[];
  productsList: IProductsList;
  status: string;
  tableNumber: number;
}
