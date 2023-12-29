import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { CurrentFormInfo } from '../../../../shared/currentFormInfo/ui/currentFormInfo';
import { useForm } from 'react-hook-form';
import { usePatchUsersMutation } from '../../../../shared/api/usersRequest/UsersRequest';
import { FormFields } from '../formFields/formFields';

interface IChangeUserInfo {
  open: boolean;
  setOpen: (params: boolean) => void;
  avatar: string;
  name: string;
  role: string;
  _id: string;
}

interface IInitialState {
  avatar?: string;
  name?: string;
  role?: string;
}

export const ChangeUserInfo: FC<IChangeUserInfo> = ({ open, setOpen, avatar, name, role, _id }) => {
  const form = useForm<IInitialState>({
    defaultValues: {
      avatar: '' || undefined,
      name: '',
      role: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const [patchUsers] = usePatchUsersMutation() || {};

  const onSubmit = (data: IInitialState) => {
    patchUsers({
      _id: _id,
      avatar: data.avatar || avatar,
      name: data.name || name,
      role: data.role || role
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
        <Stack direction="column">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h6"
              component="h2"
              style={{ textAlign: 'center', paddingTop: '16px' }}
            >
              Изменение пользователя
            </Typography>
            <CurrentFormInfo
              avatar={avatar}
              name={name}
              role={role}
            />
            <FormFields
              register={register}
              errors={errors}
              role={role}
            />
            <Button
              size="large"
              fullWidth
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              Изменить
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
