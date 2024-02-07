import { useEffect, useState } from 'react';
import { ICheque } from '../../../shared/types/ICheque';

export const useSetColor = (
  chequeProps: ICheque,
  cssClassOpened: string,
  cssClassClosed: string,
  cssClassDeleted: string
) => {
  const [cssClassStatus, setCssClassStatus] = useState('');

  useEffect(() => {
    if (chequeProps.status === 'opened') {
      setCssClassStatus(cssClassOpened);
    }

    if (chequeProps.status === 'closed') {
      setCssClassStatus(cssClassClosed);
    }

    if (chequeProps.status === 'deleted') {
      setCssClassStatus(cssClassDeleted);
    }
  }, [chequeProps]);

  return cssClassStatus;
};
