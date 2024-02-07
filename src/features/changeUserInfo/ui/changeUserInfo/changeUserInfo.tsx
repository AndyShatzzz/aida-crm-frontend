import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { CurrentFormInfo } from '../../../../shared/currentFormInfo';
import { useForm } from 'react-hook-form';
import { usePatchUsersMutation } from '../../../../shared/api/usersRequest/UsersRequest';
import { FormFields } from '../formFields/formFields';
import { IInitialState } from '../../types/IInitialState';
import { IChangeUserInfo } from '../../types/IChangeUserInfo';
import { useChangeUserInfoSubmit } from '../../hooks/useChangeUserInfoSubmit';

export const ChangeUserInfo: FC<IChangeUserInfo> = ({ open, setOpen, avatar, name, role, _id }) => {
  const [patchUsers] = usePatchUsersMutation() || {};
  const onSubmit = useChangeUserInfoSubmit(patchUsers, setOpen, _id, avatar, name, role);

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
