import moment from 'moment';
import { ICheque } from '../../../shared/types/ICheque';

export const useDateFormat = (chequeProps: ICheque) => {
  const date = `${moment(chequeProps.createdAt).format('DD-MM-YYYY')} ${moment(chequeProps.createdAt).format(
    'HH:MM:SS'
  )}`;
  return date;
};
