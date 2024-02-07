import { Box, Divider, List, ListItem, ListSubheader } from '@mui/material';
import { Users } from '../../../entities/users/ui/users';
import { usersRequest } from '../../../shared/api/usersRequest/UsersRequest';
import { IUsers } from '../../../shared/types/IUsers';

export const UsersList = () => {
  const { data: users } = usersRequest.useGetUsersQuery();
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
      {users &&
        users?.map((item: IUsers) => (
          <Users
            key={item._id}
            _id={item._id}
            name={item.name}
            role={item.role}
            avatar={item.avatar}
          />
        ))}
    </Box>
  );
};
