import { ICheque } from '../../../shared/types/ICheque';

export interface IChangeCheque {
  chequeProps: ICheque;
  expanded: string | boolean;
  setExpanded: (params: string | false) => void;
}
