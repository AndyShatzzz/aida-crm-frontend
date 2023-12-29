import { Avatar, List, ListItem, ListItemText, Button, ListItemAvatar } from '@mui/material';
import React, { FC, useState } from 'react';
import { ChangeUserInfo } from '../../../features/changeUserInfo/ui/changeUserInfo/changeUserInfo';

interface IUsersList {
  avatar: string;
  name: string;
  role: string;
  _id: string;
}

export const Users: FC<IUsersList> = ({ avatar, name, role, _id }) => {
  const [open, setOpen] = useState(false);
  return (
    <List
      component="div"
      disablePadding
      sx={{ flexGrow: 1 }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatar} />
        </ListItemAvatar>
        <ListItemText style={{ width: '64px' }}>{name}</ListItemText>
        <ListItemText style={{ width: '64px' }}>{role}</ListItemText>
        <Button
          size="small"
          onClick={() => setOpen(true)}
        >
          Изменить
        </Button>
        <ChangeUserInfo
          open={open}
          setOpen={setOpen}
          avatar={avatar}
          name={name}
          role={role}
          _id={_id}
        />
        {/* <Modal
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
              <Box component="form">
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ textAlign: 'center', paddingTop: '16px' }}
                >
                  Изменение пользователя
                </Typography>
                <TextField
                  sx={{ mt: 2 }}
                  label="Аватар"
                  id="avatar"
                  type="text"
                  fullWidth
                />
                <TextField
                  sx={{ mt: 2 }}
                  label="Имя"
                  id="name"
                  type="text"
                  fullWidth
                />
                <TextField
                  sx={{ mt: 2 }}
                  label="Должность"
                  id="role"
                  type="text"
                  fullWidth
                />
                <Button
                  size="large"
                  fullWidth
                >
                  Изменить
                </Button>
              </Box>
            </Stack>
          </Box>
        </Modal> */}
      </ListItem>
    </List>
  );
};
