import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { ConfirmationModal } from '../../../shared/confirmationModal';
import { IDeleteProductsProps } from '../types/IDeleteProductsProps';

export const DeleteProduct: FC<IDeleteProductsProps> = ({ _id }) => {
  const [DeleteProduct] = productsRequest.useDeleteProductMutation();

  const [open, setOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    if (isConfirm) {
      DeleteProduct({
        _id: _id
      });
    }
  }, [isConfirm]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="small"
      >
        Удалить
      </Button>
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        setIsConfirm={setIsConfirm}
      />
    </>
  );
};
