import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { productsRequest } from '../../../api/productsRequest/productsRequest';
import { usersRequest } from '../../../api/usersRequest/UsersRequest';
import { CurrentFormInfo } from '../../../currentFormInfo';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, resetProduct } from '../../../productSlice/productSlice';
import { RootState } from '../../../model/store';
import { IFormModalProps } from '../../types/IFormModalProps';
import { IFromValues } from '../../types/IFromValues';
import { FormModalInputFields } from '../formModalInputFields/formModalInputFields';
import { usePostSubmit } from '../../hooks/usePostSubmit';
import { usePatchSubmit } from '../../hooks/usePatchSubmit';
import { useModalFormState } from '../../hooks/useModalFormState';

export const FormModal: FC<IFormModalProps> = ({
  open,
  setOpen,
  title,
  popup,
  buttonText,
  _id,
  name,
  image,
  quantity,
  price
}) => {
  const { data: user } = usersRequest.useGetUserInfoQuery();
  const [PostProducts] = productsRequest.usePostProductMutation();
  const [PatchProduct] = productsRequest.usePatchProductMutation();
  const { data: products } = productsRequest.useGetProductsQuery();
  const dispatch = useDispatch();
  const prevStateProductsQuantity: any = useSelector((state: RootState) => state.productReducer);

  const postProductsSubmit = usePostSubmit(PostProducts, user?._id);
  const patchProductsSubmit = usePatchSubmit(_id, prevStateProductsQuantity, name, price, image, PatchProduct);

  const form = useModalFormState(price, name);
  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;

  useEffect(() => {
    dispatch(resetProduct({}));
    setTimeout(() => {
      dispatch(addProduct({ productId: _id, productData: { quantity: quantity } }));
    }, 100);
  }, [products]);

  const onSubmit = (data: IFromValues) => {
    if (user && popup === 'addProduct') {
      postProductsSubmit(data);
      reset();
    }
    if (popup === 'changeProduct') {
      patchProductsSubmit(data);
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        bgcolor="background.paper"
        sx={{ width: '400px' }}
        style={{ position: 'absolute', top: '30%', left: '38%' }}
      >
        <Stack
          direction="column"
          spacing={2}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h6"
              component="h2"
              style={{ textAlign: 'center', paddingTop: '16px' }}
            >
              {title}
            </Typography>
            <CurrentFormInfo
              avatar={image || watch('image')}
              name={name || watch('productName')}
              role={quantity || watch('quantity')}
              price={price || watch('price')}
            />
            <FormModalInputFields
              register={register}
              errors={errors}
            />
            <Button
              size="large"
              fullWidth
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              {buttonText}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
