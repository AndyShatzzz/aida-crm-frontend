import { Box, Divider, List, ListItem, ListSubheader } from '@mui/material';
import React from 'react';
import { Users } from '../../../entities/users/ui/users';
// import { usersRequest } from '../api/UsersRequest';
import { usersRequest } from '../../../shared/api/usersRequest/UsersRequest';

interface IUsers {
  _id: string;
  avatar: string;
  name: string;
  role: string;
}

export const UsersList = () => {
  const { data } = usersRequest.useGetUsersQuery();
  return (
    <Box
      marginTop="84px"
      marginLeft="50px"
      sx={{ flexGrow: 1 }}
    >
      <List
        component="div"
        disablePadding
        sx={{ flexGrow: 1 }}
      >
        <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ListSubheader
            component="span"
            style={{ padding: '0' }}
            sx={{ flexGrow: 0.2 }}
          >
            Аватар
          </ListSubheader>
          <ListSubheader
            component="span"
            sx={{ flexGrow: 16 }}
          >
            Имя
          </ListSubheader>
          <ListSubheader
            component="span"
            sx={{ flexGrow: 15 }}
          >
            Должность
          </ListSubheader>
          <ListSubheader
            component="span"
            sx={{ flexGrow: 0.1 }}
          >
            Действия
          </ListSubheader>
        </ListItem>
      </List>
      <Divider />
      {data &&
        data.map((item: IUsers) => (
          <Users
            key={item._id}
            avatar={item.avatar}
            role={item.role}
            name={item.name}
            _id={item._id}
          />
        ))}
    </Box>
  );
};
