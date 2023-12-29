import React, { useState } from 'react';
import { SaleCreating } from '../../../widgets/saleCreating/saleCreating';
import { TableList } from '../../../widgets/tableList/ui/tableList';

export const Sale = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  return (
    <div>
      {!isTableOpen && <TableList setIsTableOpen={setIsTableOpen} />}

      <SaleCreating
        isTableOpen={isTableOpen}
        setIsTableOpen={setIsTableOpen}
      />
    </div>
  );
};
