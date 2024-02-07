import { Avatar, List, ListItem, ListItemText, Button, ListItemAvatar } from '@mui/material';
import { FC, useState } from 'react';
import { ChangeUserInfo } from '../../../features/changeUserInfo/ui/changeUserInfo/changeUserInfo';
import { IUsers } from '../../../shared/types/IUsers';

export const Users: FC<IUsers> = ({ _id, name, role, avatar }) => {
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
      </ListItem>
    </List>
  );
};
