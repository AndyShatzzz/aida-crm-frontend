import { IPrevState } from '../../../types/IPrevState';
import { IProductsList } from '../../../types/IProductsList';

export type TGetCheques = {
  _id?: string;
  tableNumber: number;
  status: string;
  productsList: IProductsList;
  owner: string;
  prevState: IPrevState[];
  updatedState?: any;
  createdAt?: string; // может быть косяк!!!
};
