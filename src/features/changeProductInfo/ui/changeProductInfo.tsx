import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { FormModal } from '../../../shared/formModal/ui/formModal';

interface IChangeProductInfo {
  _id: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

export const ChangeProductInfo: FC<IChangeProductInfo> = ({ _id, image, name, quantity, price }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        size="small"
        onClick={() => setOpen(true)}
      >
        Изменить
      </Button>
      <FormModal
        open={open}
        setOpen={setOpen}
        title={'Изменение продукта'}
        popup={'changeProduct'}
        buttonText={'Изменить'}
        _id={_id}
        image={image}
        name={name}
        quantity={quantity}
        price={price}
      />
    </>
  );
};
