import { Avatar, Box, ListItemIcon, ListItemText, Stack } from '@mui/material';
import React, { FC } from 'react';

interface ICurrentFormInfo {
  avatar: string;
  name: string;
  role: string | number;
  price?: number;
}

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
