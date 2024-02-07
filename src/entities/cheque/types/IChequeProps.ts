import { ReactNode } from 'react';
import { ICheque } from '../../../shared/types/ICheque';

export interface IChequeProps {
  chequeProps: ICheque;
  children: ReactNode;
  expanded: string | boolean;
  setExpanded: (params: string | false) => void;
}
