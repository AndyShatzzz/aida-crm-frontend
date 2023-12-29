import { Box, Button, InputAdornment, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { productsRequest } from '../../api/productsRequest/productsRequest';
import { usersRequest } from '../../api/usersRequest/UsersRequest';
import { CurrentFormInfo } from '../../currentFormInfo/ui/currentFormInfo';

interface IFormModalProps {
  open: boolean;
  setOpen: (params: boolean) => void;
  title: string;
  popup: string;
  buttonText: string;
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface IFromValues {
  image: string;
  productName: string;
  price: number;
  quantity: number;
}

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
  const form = useForm<IFromValues>({
    defaultValues: {
      image: '',
      productName: '',
      quantity: quantity || 0,
      price: price || 0
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState, watch, reset } = form;

  const { errors, isDirty, isSubmitting } = formState;

  const { data: user } = usersRequest.useGetUserInfoQuery();
  const [PostProducts] = productsRequest.usePostProductMutation();
  const [PatchProduct] = productsRequest.usePatchProductMutation();

  const onSubmit = (data: IFromValues) => {
    if (user && popup === 'addProduct') {
      PostProducts({
        name: data.productName,
        quantity: data.quantity,
        price: data.price,
        image: data.image,
        owner: user._id
      });
      reset();
    }
    if (popup === 'changeProduct')
      PatchProduct({
        _id: _id,
        name: data.productName || name,
        quantity: data.quantity || quantity,
        price: data.price || price,
        image: data.image || image
      });
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
            <TextField
              type="text"
              fullWidth
              sx={{ mt: 2 }}
              label="Изображение"
              {...register('image', {
                pattern: {
                  value:
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                  message: 'Данное поле может содержать только ссылку на продукт'
                }
              })}
              helperText={errors.image?.message}
            />
            <TextField
              type="text"
              fullWidth
              sx={{ mt: 2 }}
              label="Наименование"
              {...register('productName', {
                required: {
                  value: true,
                  message: 'Данное поле обязательно для заполнения'
                },
                pattern: {
                  value: /[a-zA-Zа-яА-ЯЁё -]+$/,
                  message: 'Наименование продукта может содержать только латиницу, кириллицу, пробел и дефис'
                },
                minLength: {
                  value: 3,
                  message: 'Наименование продукта не может содержать меньше трех символов'
                }
              })}
              helperText={errors.productName?.message}
            />
            <TextField
              type="number"
              fullWidth
              sx={{ mt: 2 }}
              label="Цена"
              InputProps={{
                endAdornment: <InputAdornment position="end">Р</InputAdornment>
              }}
              {...register('price', {
                required: {
                  value: true,
                  message: 'Данное поле обязательно для заполнения'
                },
                // pattern: {
                //   value: /^\d+$/,
                //   message: 'Данное поле может содержать только целые числа'
                // },
                min: {
                  value: 1,
                  message: 'Цена продукта должно быть больше 0'
                },
                valueAsNumber: true
              })}
              helperText={errors.quantity?.message}
            />
            <TextField
              type="number"
              fullWidth
              sx={{ mt: 2 }}
              label="Количество"
              InputProps={{
                endAdornment: <InputAdornment position="end">шт</InputAdornment>
              }}
              {...register('quantity', {
                required: {
                  value: true,
                  message: 'Данное поле обязательно для заполнения'
                },
                // pattern: {
                //   value: /^\d+$/,
                //   message: 'Данное поле может содержать только целые числа'
                // },
                min: {
                  value: 1,
                  message: 'Количество продукта должно быть больше 0'
                },
                valueAsNumber: true
              })}
              helperText={errors.quantity?.message}
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
