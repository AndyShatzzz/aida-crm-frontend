import { IPrevState } from '../../../shared/types/IPrevState';
import { IProductsList } from '../../../shared/types/IProductsList';

export interface IUsePatchCheque {
  _id: string;
  productsList: IProductsList;
  prevState?: IPrevState[];
  status?: string;
}
