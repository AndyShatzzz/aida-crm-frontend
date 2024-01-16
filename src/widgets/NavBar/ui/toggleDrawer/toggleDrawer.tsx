import React, { FC } from 'react';
import css from './toggleDrawer.module.scss';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import TapasIcon from '@mui/icons-material/Tapas';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import { IToggleDrawerProps } from '../../type/IToggleDrawerProps';

export const ToggleDrawer: FC<IToggleDrawerProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
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
            to={'/users'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>

                <ListItemText color="inherit">Пользователи</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            className={css.link}
            to={'/products'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <TapasIcon />
                </ListItemIcon>

                <ListItemText color="inherit">Продукты</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            className={css.link}
            to={'/cheques'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText color="inherit">Чеки</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            className={css.link}
            to={'/statistics'}
          >
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <StackedLineChartIcon />
                </ListItemIcon>

                <ListItemText color="inherit">Статистика</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
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
