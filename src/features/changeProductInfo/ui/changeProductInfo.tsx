import { Button } from '@mui/material';
import { FC, useState } from 'react';
import { FormModal } from '../../../shared/formModal';
import { IChangeProductInfo } from '../types/IChangeProductInfo';

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
