import { FC } from 'react';
import css from './toggleDrawer.module.scss';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { IToggleDrawerProps } from '../../type/IToggleDrawerProps';
import { linkData } from '../../lib/constants/linkData';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { usersRequest } from '../../../../shared/api/usersRequest/UsersRequest';

export const ToggleDrawer: FC<IToggleDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { data: user } = usersRequest.useGetUserInfoQuery();
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box className={css.container}>
        <List>
          <Link
            className={css.link}
            to={'/'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText color="inherit">О проекте</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          {user &&
            user.role !== 'Официант' &&
            linkData.map((item: any, index: number) => (
              <Link
                className={css.link}
                to={item.link}
                key={index}
              >
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>{<item.icon />}</ListItemIcon>

                    <ListItemText color="inherit">{item.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          <Link
            className={css.link}
            to={'/settings'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Настройки</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            className={css.link}
            to={'/menu'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Быстрые продажи</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
};
