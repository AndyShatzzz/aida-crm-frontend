import { ICheque } from '../../../shared/types/ICheque';

export interface IFilterDatePickerProps {
  cheques: ICheque[] | undefined;
  setFilteredCheques: (params: ICheque[]) => void;
}
