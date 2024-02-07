import { Avatar, Box, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { FC } from 'react';
import { ICurrentFormInfo } from '../types/ICurrentFormInfo';

export const CurrentFormInfo: FC<ICurrentFormInfo> = ({ avatar, name, role, price }) => {
  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
      <Stack direction="column">
        {avatar && (
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar src={avatar} />
          </ListItemIcon>
        )}
        {name && <ListItemText style={{ textAlign: 'center' }}>{name}</ListItemText>}
        {(price || !isNaN) && <ListItemText style={{ textAlign: 'center' }}>{price}</ListItemText>}
        {(role || !isNaN) && <ListItemText style={{ textAlign: 'center' }}>{role}</ListItemText>}
      </Stack>
    </Box>
  );
};
