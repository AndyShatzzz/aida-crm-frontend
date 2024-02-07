import React, { useState } from 'react';
import { SaleCreating } from '../../../widgets/saleCreating';
import { TableList } from '../../../widgets/tableList';

export const Sale = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  return (
    <div>
      {!isTableOpen && (
        <TableList
          setIsTableOpen={setIsTableOpen}
          setTableNumber={setTableNumber}
        />
      )}

      <SaleCreating
        isTableOpen={isTableOpen}
        setIsTableOpen={setIsTableOpen}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
      />
    </div>
  );
};
